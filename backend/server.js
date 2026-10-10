const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const notFound = require("./middlewares/notFoundMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");
const collaborationRoutes = require("./routes/collaborationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// ✅ SOCKET INIT
const { initSocket } = require("./sockets");

// ✅ CENTRAL ROUTES
const routes = require("./routes");

const app = express();

/* ======================================================
   GLOBAL MIDDLEWARE
====================================================== */

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

/* ======================================================
   ROUTES
====================================================== */

app.use("/api", routes);
app.use("/api/exam", require("./routes/examRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/snapshots", require("./routes/codeSnapshotRoutes"));
app.use("/api/learning", require("./routes/learningRoutes"));
app.use("/api/ai-tutor", require("./routes/aiTutorRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/collaboration", collaborationRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ======================================================
   DATABASE CONNECTION
====================================================== */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

/* ======================================================
   HEALTH CHECK
====================================================== */

app.get("/", (req, res) => {
  res.send("CollabCode AI Backend Running 🚀");
});

/* ======================================================
   GLOBAL ERROR HANDLING
====================================================== */

app.use(notFound);
app.use(errorHandler);

/* ======================================================
   SERVER START (HTTP + SOCKET)
====================================================== */

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// 🔌 initialize socket (collab + exam)
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
