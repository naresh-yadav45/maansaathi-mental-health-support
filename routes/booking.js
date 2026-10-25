const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// GET /api/booking/counselors - list available counselors
router.get("/counselors", requireAuth, async (req, res) => {
  try {
    const counselors = await User.find({ role: "counselor", isAvailable: true }).select(
      "displayName specialization languagesSpoken"
    );
    res.json(counselors);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch counselors", error: err.message });
  }
});

// POST /api/booking - create a booking request
router.post("/", requireAuth, async (req, res) => {
  try {
    const { counselorId, slot, mode } = req.body;
    const booking = await Booking.create({
      student: req.userId,
      counselor: counselorId,
      slot,
      mode,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Could not create booking", error: err.message });
  }
});

// GET /api/booking/mine - student's own bookings
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.userId })
      .populate("counselor", "displayName specialization")
      .sort({ slot: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch bookings", error: err.message });
  }
});

// PATCH /api/booking/:id/status - counselor/admin updates booking status
router.patch("/:id/status", requireAuth, requireRole("counselor", "admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Could not update booking", error: err.message });
  }
});

module.exports = router;
