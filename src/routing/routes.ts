import express from "express";
import authService from "../services/Auth";
import MedicalRecordService from "../services/MedicalRecord";
import { AuthRequest } from "../types/express";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.register(email, password);
    res.json(result);
  } catch (err) {
    const msg = (err as unknown as Error).message;

    res.status(400).json({ error: msg });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    const msg = (err as unknown as Error).message;
    res.status(401).json({ error: msg });
  }
});

// Get medical records
router.get("/records", authService.authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.db) return res.status(500).json({error: "no db"})
    const records = await MedicalRecordService.getRecords(req.db);
    res.json(records);
  } catch (err) {
    const msg = (err as unknown as Error).message;
    res.status(500).json({ error: msg });
  }
});

// Create medical record
router.post("/records", authService.authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (!req.db) return res.status(500).json({error: "no db"})
    const record = await MedicalRecordService.createRecord(req.db, req.body);
    res.json(record);
  } catch (err) {
    const msg = (err as unknown as Error).message;
    res.status(500).json({ error: msg });
  }
});

export default router;
