const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  createShipment,
  getAllShipments,
  markInTransit,
  markDelivered
} = require("../controllers/shipmentController");

// Admin creates shipment
router.post("/", protect, allowRoles("admin"), createShipment);

// Admin views shipments
router.get("/", protect, allowRoles("admin"), getAllShipments);

router.patch("/:id/in-transit", protect, allowRoles("admin"), markInTransit);
router.patch("/:id/delivered", protect, allowRoles("admin"), markDelivered);

module.exports = router;
