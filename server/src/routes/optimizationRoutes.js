const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const {
  runOptimizationWithExplainability,
  getOptimizationHistory
} = require("../controllers/optimizationController");

// Run optimization
router.post(
  "/run",
  protect,
  allowRoles("admin"),
  runOptimizationWithExplainability
);

// Optimization history
router.get(
  "/history",
  protect,
  allowRoles("admin"),
  getOptimizationHistory
);

module.exports = router;
