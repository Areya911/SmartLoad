const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  createTruck,
  getAllTrucks,
  getMyTrucks,
  updateTruck,
  deleteTruck
} = require("../controllers/truckController");

// Truck owner adds truck
router.post("/", protect, allowRoles("admin","truck_owner"), createTruck);

// Admin views all trucks
router.get("/", protect, allowRoles("admin"), getAllTrucks);

// Truck owner views ONLY their trucks
router.get(
  "/my",
  protect,
  allowRoles("truck_owner"),
  getMyTrucks
);

// Edit truck (only if available)
router.patch(
  "/:id",
  protect,
  allowRoles("truck_owner"),
  updateTruck
);

// Delete truck (only if available)
router.delete(
  "/:id",
  protect,
  allowRoles("truck_owner"),
  deleteTruck
);

module.exports = router;
