const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const truckRoutes = require("./routes/truckRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const optimizationRoutes = require("./routes/optimizationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const locationRoutes = require("./routes/locationRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/optimize", optimizationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/location", locationRoutes);

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SmartLoad backend is running 🚛"
  });
});

module.exports = app;