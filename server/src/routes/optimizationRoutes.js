const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// ✅ ADD THIS LINE
const {
  runOptimizationWithExplainability
} = require("../controllers/optimizationController");

router.post(
  "/run-with-explain",
  protect,
  allowRoles("admin"),
  runOptimizationWithExplainability
);

module.exports = router;
