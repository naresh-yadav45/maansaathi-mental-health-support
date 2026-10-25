const express = require("express");
const MoodLog = require("../models/MoodLog");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /api/mood  - log today's mood
router.post("/", requireAuth, async (req, res) => {
  try {
    const { moodScore, note } = req.body;
    const log = await MoodLog.create({ user: req.userId, moodScore, note });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: "Could not save mood log", error: err.message });
  }
});

// GET /api/mood  - fetch this user's mood history (for trend graph)
router.get("/", requireAuth, async (req, res) => {
  try {
    const logs = await MoodLog.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(30);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch mood logs", error: err.message });
  }
});

module.exports = router;
