const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moodScore: {
      type: Number, // 1 (very low) to 5 (very good)
      min: 1,
      max: 5,
      required: true,
    },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoodLog", moodLogSchema);
