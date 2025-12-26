const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const { updateLocation } = require("../controllers/locationController");

router.post(
  "/update",
  protect,
  allowRoles("truck_owner"),
  updateLocation
);

module.exports = router;
