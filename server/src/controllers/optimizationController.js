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
