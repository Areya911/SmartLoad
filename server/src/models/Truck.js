const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    truckNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    capacityWeight: {
      type: Number,
      required: true
    },
    capacityVolume: {
      type: Number,
      required: true
    },
    truckType: {
      type: String,
      enum: ["open", "container", "refrigerated"],
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    currentLocation: {
    lat: Number,
    lng: Number
    },
    averageSpeedKmph: {
    type: Number,
    default: 50
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", truckSchema);
