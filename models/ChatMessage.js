const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sender: { type: String, enum: ["user", "bot"], required: true },
    message: { type: String, required: true },
    riskFlag: {
      type: String,
      enum: ["none", "low", "medium", "high"],
      default: "none",
      // set by the chatbot's basic keyword/sentiment check
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
