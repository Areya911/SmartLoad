const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SmartLoad backend is running 🚛"
  });
});

module.exports = app;