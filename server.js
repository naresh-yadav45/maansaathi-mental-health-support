require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const chatbotRoutes = require("./routes/chatbot");
const bookingRoutes = require("./routes/booking");
const communityRoutes = require("./routes/community");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Digital Mental Health Support System API is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
