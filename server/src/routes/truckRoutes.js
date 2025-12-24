const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  createTruck,
  getAllTrucks
} = require("../controllers/truckController");

// Truck owner adds truck
router.post("/", protect, allowRoles("truck_owner"), createTruck);

// Admin views all trucks
router.get("/", protect, allowRoles("admin"), getAllTrucks);

module.exports = router;
