const Shipment = require("../models/Shipment");
// @desc    Create shipment
// @route   POST /api/shipments
// @access  Admin
exports.createShipment = async (req, res) => {
  try {
    const {
      name,
      source,
      destination,
      weight,
      volume,
      shipmentType
    } = req.body;

    const shipment = await Shipment.create({
      createdBy: req.user._id,
      name,
      source,
      destination,
      weight,
      volume,
      shipmentType
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all shipments
// @route   GET /api/shipments
// @access  Admin
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate(
      "createdBy",
      "name email"
    );
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Booking = require("../models/Booking");
const Truck = require("../models/Truck");

// @desc Mark shipment as in_transit
// Mark shipment as in_transit
exports.markInTransit = async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);

  if (!shipment) {
    return res.status(404).json({ message: "Shipment not found" });
  }

  if (shipment.status !== "assigned") {
    return res.status(400).json({
      message: "Only assigned shipments can be moved to in_transit"
    });
  }

  shipment.status = "in_transit";
  await shipment.save();

  res.json({ message: "Shipment marked as in transit" });
};


// Mark shipment as delivered
exports.markDelivered = async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);

  if (!shipment) {
    return res.status(404).json({ message: "Shipment not found" });
  }

  if (shipment.status !== "in_transit") {
    return res.status(400).json({
      message: "Only in-transit shipments can be delivered"
    });
  }

  shipment.status = "delivered";
  await shipment.save();

  // 🔓 Release truck via booking
  const booking = await Booking.findOne({ shipment: shipment._id });
  if (booking) {
    await Truck.findByIdAndUpdate(booking.truck, {
      isAvailable: true
    });
  }

  res.json({ message: "Shipment delivered and truck released" });
};
