const pool = require("../config/db");

const {
  hashPassword,
  comparePassword,
} = require("../utils/hash");

const generateToken =
  require("../utils/jwt");


/*
  Service layer handles:

  - business logic
  - database operations
  - reusable backend logic

  Controllers should stay thin.

  Controllers:
  - receive request
  - send response

  Services:
  - do actual work
*/


/*
  Register new user.
*/
const registerUser = async ({
  name,
  email,
  password,
}) => {

  /*
    Check if user already exists.

    Prevent duplicate accounts.
  */
  const existingUser =
    await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1
      `,
      [email]
    );


  if (
    existingUser.rows.length > 0
  ) {

    throw new Error(
      "User already exists"
    );
  }


  /*
    Hash password before storing.
  */
  const hashedPassword =
    await hashPassword(password);


  /*
    Insert new user.
  */
  const result = await pool.query(
    `
    INSERT INTO users (

      name,
      email,
      password

    )

    VALUES ($1, $2, $3)

    RETURNING
      id,
      name,
      email,
      created_at
    `,
    [
      name,
      email,
      hashedPassword,
    ]
  );

  return result.rows[0];
};


/*
  Login existing user.
*/
const loginUser = async ({
  email,
  password,
}) => {

  /*
    Find user by email.
  */
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  );


  const user =
    result.rows[0];


  if (!user) {

    throw new Error(
      "Invalid credentials"
    );
  }


  /*
    Compare entered password
    against stored hash.
  */
  const validPassword =
    await comparePassword(
      password,
      user.password
    );


  if (!validPassword) {

    throw new Error(
      "Invalid credentials"
    );
  }


  /*
    Generate JWT token.
  */
  const token =
    generateToken(user);


  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};


module.exports = {
  registerUser,
  loginUser,
};