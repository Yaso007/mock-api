const pool = require("../config/db");

const { hashPassword, comparePassword } = require("../utils/hash");

const generateToken = require("../utils/jwt");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password
      )

      VALUES ($1, $2, $3)

      RETURNING
      id,
      name,
      email
      `,
      [name, email, hashedPassword],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.json({
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = {
  register,
  login,
};
