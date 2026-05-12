require("dotenv").config();

const fs = require("fs");

const path = require("path");

const pool = require("./config/db");

const app = require("./app");

const PORT =
  process.env.PORT || 5000;


const initializeDatabase =
  async () => {

    try {

      const sql = fs.readFileSync(
        path.join(
          __dirname,
          "sql",
          "schema.sql"
        ),
        "utf8"
      );

      await pool.query(sql);

      console.log(
        "Database initialized"
      );

    } catch (err) {

      console.log(err);
    }
  };


app.listen(
  PORT,
  "0.0.0.0",
  async () => {

    await initializeDatabase();

    console.log(
      `Server running on ${PORT}`
    );
  }
);