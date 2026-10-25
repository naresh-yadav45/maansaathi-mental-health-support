# MannSaathi — Digital Mental Health & Psychological Support System
### SIH25092 | Government of Jammu & Kashmir | Software | MedTech / BioTech / HealthTech

A multi-page web platform giving higher-education students confidential, anonymous access to
mental health support: an AI first-response chatbot, counselor booking, a moderated peer
community, a resource library, self-assessment screening, crisis support, and an anonymized
analytics dashboard for institutions.

## Tech Stack
- **Frontend:** React + React Router + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt

## Project Structure
```
mental-health-app/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/                # User, MoodLog, ChatMessage, Booking, CommunityPost
│   ├── routes/                # auth, mood, chatbot, booking, community, admin
│   ├── middleware/auth.js     # JWT verification
│   └── server.js              # Express app entry point
└── frontend/
    └── src/
        ├── pages/              # Home, Login, Signup, Dashboard, Chatbot, Booking,
        │                       # Community, Resources, SelfAssessment, Crisis,
        │                       # AdminDashboard, Profile
        ├── components/         # Navbar, ProtectedRoute
        ├── context/AuthContext.jsx
        ├── api.js              # centralized API calls
        └── styles/index.css    # design tokens
```

## How to Run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # then fill in MONGO_URI and JWT_SECRET
npm run dev                # starts on http://localhost:5000
```
You need a MongoDB instance — either install MongoDB locally, or use a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster and paste its connection string into `.env`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```
The frontend is already configured (`vite.config.js`) to proxy `/api` requests to the backend.

### 3. Try it out
1. Open http://localhost:5173
2. Sign up as a student (you can enable "anonymous mode")
3. Explore: mood check-in → chatbot → self-assessment → booking → community

To test the **admin dashboard**, manually change a user's `role` field to `"admin"` in MongoDB
(e.g. via MongoDB Compass or `mongosh`), then log in again.

## Notes for the SIH Presentation
- The chatbot currently uses **keyword-based risk detection** as a placeholder — for the real
  submission, swap `backend/routes/chatbot.js` with a trained NLP/sentiment model or an LLM API call.
- Crisis page includes verified India helplines: **Tele-MANAS (14416)** and **KIRAN (1800-599-0019)**.
- Suggested differentiators for judges, given this PS is from J&K: multilingual support (Kashmiri/
  Dogri/Urdu) and offline-first resource access for low-connectivity areas.
- All admin analytics are aggregated/anonymized by design — no individual student data is exposed.
