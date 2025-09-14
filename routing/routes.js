import express from "express";
import AuthService from "../services/Auth.js";
import MedicalRecordService from "../services/MedicalRecord.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.register(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Get medical records
router.get("/records", AuthService.authMiddleware, async (req, res) => {
  try {
    const records = await MedicalRecordService.getRecords(req.db);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create medical record
router.post("/records", AuthService.authMiddleware, async (req, res) => {
  try {
    const record = await MedicalRecordService.createRecord(req.db, req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
