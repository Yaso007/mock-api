const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API Running");
});


// Create table
app.get("/setup", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      )
    `);

    res.send("Users table created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


// CREATE
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


// READ ALL
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


// READ ONE
app.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *
      `,
      [name, email, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [req.params.id]
    );

    res.json({
      message: "User deleted"
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});