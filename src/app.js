const express = require("express");

const authRoutes = require("./routes/authRoutes");

const firRoutes = require("./routes/firRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/fir", firRoutes);

module.exports = app;
