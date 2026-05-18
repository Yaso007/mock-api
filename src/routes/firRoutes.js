const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createFIR, getAllFIRs, getFIR, updateFIR, deleteFIR } = require("../controllers/firController");

router.post("/", authMiddleware, createFIR);
router.get("/", authMiddleware, getAllFIRs);
router.get("/:id", authMiddleware, getFIR);
router.put("/:id", authMiddleware, updateFIR);
router.delete("/:id", authMiddleware, deleteFIR);  

module.exports = router;
