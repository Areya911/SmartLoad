const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true
    },
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true
    },
    status: {
      type: String,
      enum: ["assigned", "in_transit", "completed"],
      default: "assigned"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
