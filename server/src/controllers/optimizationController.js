const {
  optimizeShipmentsWithExplainability
} = require("../services/optimizationService");

exports.runOptimizationWithExplainability = async (req, res) => {
  try {
    const result = await optimizeShipmentsWithExplainability();
    res.status(200).json({
      message: "Optimization completed with explainability",
      ...result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const OptimizationRun = require("../models/OptimizationRun");


exports.getOptimizationHistory = async (req, res) => {
  try {
    const history = await OptimizationRun.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};