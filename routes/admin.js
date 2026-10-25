const express = require("express");
const MoodLog = require("../models/MoodLog");
const ChatMessage = require("../models/ChatMessage");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET /api/admin/mood-trend - average mood score per day, no individual identities
router.get("/mood-trend", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const trend = await MoodLog.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          averageMood: { $avg: "$moodScore" },
          entries: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(trend);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch mood trend", error: err.message });
  }
});

// GET /api/admin/risk-summary - count of high/medium risk chatbot flags (anonymized)
router.get("/risk-summary", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const summary = await ChatMessage.aggregate([
      { $match: { riskFlag: { $ne: "none" } } },
      { $group: { _id: "$riskFlag", count: { $sum: 1 } } },
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch risk summary", error: err.message });
  }
});

module.exports = router;
