const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      // Students can use a pseudonym instead of their real name for anonymity
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // stored as bcrypt hash, never plain text
    },
    role: {
      type: String,
      enum: ["student", "counselor", "admin"],
      default: "student",
    },
    college: {
      type: String,
      trim: true,
    },
    anonymousMode: {
      type: Boolean,
      default: false, // if true, real name is hidden across the platform
    },
    languagePreference: {
      type: String,
      default: "en",
    },
    // For counselors only
    specialization: { type: String },
    languagesSpoken: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
