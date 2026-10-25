const express = require("express");
const CommunityPost = require("../models/CommunityPost");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/community - list posts (optionally filter by category)
router.get("/", requireAuth, async (req, res) => {
  try {
    const filter = { flagged: false };
    if (req.query.category) filter.category = req.query.category;

    const posts = await CommunityPost.find(filter)
      .populate("author", "displayName anonymousMode")
      .sort({ createdAt: -1 });

    // Hide author identity wherever the post is marked anonymous
    const sanitized = posts.map((p) => {
      const obj = p.toObject();
      if (obj.anonymous) obj.author = { displayName: "Anonymous Student" };
      return obj;
    });

    res.json(sanitized);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch posts", error: err.message });
  }
});

// POST /api/community - create a post
router.post("/", requireAuth, async (req, res) => {
  try {
    const { content, category, anonymous } = req.body;
    const post = await CommunityPost.create({
      author: req.userId,
      content,
      category,
      anonymous: anonymous !== false,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Could not create post", error: err.message });
  }
});

// POST /api/community/:id/support - "I relate" reaction
router.post("/:id/support", requireAuth, async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { supportCount: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Could not update post", error: err.message });
  }
});

// POST /api/community/:id/flag - report a post for moderation
router.post("/:id/flag", requireAuth, async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      { flagged: true },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Could not flag post", error: err.message });
  }
});

module.exports = router;
