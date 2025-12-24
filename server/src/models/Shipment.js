const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    source: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    weight: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      required: true
    },
    shipmentType: {
      type: String,
      enum: ["general", "fragile", "perishable"],
      default: "general"
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "in_transit", "delivered"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
