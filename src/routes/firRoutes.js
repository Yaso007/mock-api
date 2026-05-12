const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createFIR, getAllFIRs } = require("../controllers/firController");

router.post("/", authMiddleware, createFIR);

router.get("/", authMiddleware, getAllFIRs);

module.exports = router;
