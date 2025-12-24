const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  runOptimization
} = require("../controllers/optimizationController");

router.post(
  "/run",
  protect,
  allowRoles("admin"),
  runOptimization
);

module.exports = router;
