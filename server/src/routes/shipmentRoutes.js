const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  createShipment,
  getAllShipments,
  getMyShipments,
  updateShipment,
  deleteShipment,
  markInTransit,
  markDelivered
} = require("../controllers/shipmentController");

// Admin creates shipment
router.post("/", protect, allowRoles("admin"), createShipment);

// Admin views shipments
router.get("/", protect, allowRoles("admin"), getAllShipments);

router.patch("/:id/in-transit", protect, allowRoles("admin"), markInTransit);
router.patch("/:id/delivered", protect, allowRoles("admin"), markDelivered);

// Shipment owner views own shipments
router.get(
  "/my",
  protect,
  allowRoles("shipment_owner"),
  getMyShipments
);

// Edit shipment (pending only)
router.patch(
  "/:id",
  protect,
  allowRoles("admin", "truck_owner"),
  updateShipment
);

// Delete shipment (pending only)
router.delete(
  "/:id",
  protect,
  allowRoles("admin", "truck_owner"),
  deleteShipment
);

module.exports = router;
