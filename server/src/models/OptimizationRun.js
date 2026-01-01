const mongoose = require("mongoose");

const optimizationRunSchema = new mongoose.Schema({
  executedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignments: Array,
  explanations: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "OptimizationRun",
  optimizationRunSchema
);
