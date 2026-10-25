const express = require("express");
const ChatMessage = require("../models/ChatMessage");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// Basic keyword-based risk detection.
// NOTE: for the real hackathon build, replace this with a trained NLP/sentiment
// model (e.g. a fine-tuned classifier or an LLM call) - this is a placeholder
// that keeps the flow demonstrable without external AI dependencies.
const HIGH_RISK_KEYWORDS = ["suicide", "end my life", "kill myself", "self harm", "no reason to live"];
const MEDIUM_RISK_KEYWORDS = ["hopeless", "worthless", "can't cope", "give up", "panic attack"];

function detectRisk(text) {
  const lower = text.toLowerCase();
  if (HIGH_RISK_KEYWORDS.some((k) => lower.includes(k))) return "high";
  if (MEDIUM_RISK_KEYWORDS.some((k) => lower.includes(k))) return "medium";
  return "none";
}

function generateBotReply(userText, risk) {
  if (risk === "high") {
    return "It sounds like you're going through something really painful right now. You don't have to face this alone — I'm connecting you with a counselor and crisis support immediately. Please reach out to them or a helpline right away.";
  }
  if (risk === "medium") {
    return "That sounds really hard. Thank you for sharing it with me. Would you like to try a short breathing exercise, or would you prefer to talk to a counselor?";
  }
  const lower = userText.toLowerCase();
  if (lower.includes("exam") || lower.includes("study")) {
    return "Exam stress is really common. Want to try a quick 2-minute breathing exercise, or see some study-life balance tips from the resource library?";
  }
  return "I'm here to listen. Can you tell me a bit more about how you're feeling today?";
}

// POST /api/chatbot/message
router.post("/message", requireAuth, async (req, res) => {
  try {
    const { message } = req.body;
    const risk = detectRisk(message);

    await ChatMessage.create({ user: req.userId, sender: "user", message, riskFlag: risk });

    const botReply = generateBotReply(message, risk);
    const botMessage = await ChatMessage.create({
      user: req.userId,
      sender: "bot",
      message: botReply,
      riskFlag: risk,
    });

    res.json({ reply: botMessage.message, riskFlag: risk });
  } catch (err) {
    res.status(500).json({ message: "Chatbot error", error: err.message });
  }
});

// GET /api/chatbot/history
router.get("/history", requireAuth, async (req, res) => {
  try {
    const history = await ChatMessage.find({ user: req.userId }).sort({ createdAt: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch chat history", error: err.message });
  }
});

module.exports = router;
