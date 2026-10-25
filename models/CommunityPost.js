const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    anonymous: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const communityPostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    anonymous: { type: Boolean, default: true },
    category: {
      type: String,
      enum: ["exam-stress", "relationships", "career-anxiety", "general"],
      default: "general",
    },
    content: { type: String, required: true },
    supportCount: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunityPost", communityPostSchema);
