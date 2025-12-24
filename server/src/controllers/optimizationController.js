const { optimizeShipments } = require("../services/optimizationService");

exports.runOptimization = async (req, res) => {
  try {
    const results = await optimizeShipments();
    res.status(200).json({
      message: "Optimization completed",
      assignments: results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
