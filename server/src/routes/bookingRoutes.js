const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const { getDriverAssignments } = require("../controllers/bookingController");
const {
  startTrip,
  completeTrip,
  getDriverBookings
} = require("../controllers/bookingController");

router.get(
  "/my",
  protect,
  allowRoles("truck_owner"),
  getDriverBookings
);

router.patch(
  "/:id/start",
  protect,
  allowRoles("truck_owner"),
  startTrip
);

router.patch(
  "/:id/complete",
  protect,
  allowRoles("truck_owner"),
  completeTrip
);

router.get(
  "/my-assignments",
  protect,
  allowRoles("truck_owner"),
  getDriverAssignments
);

module.exports = router;
