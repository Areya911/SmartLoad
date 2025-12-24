const Shipment = require("../models/Shipment");

// @desc    Create shipment
// @route   POST /api/shipments
// @access  Admin
exports.createShipment = async (req, res) => {
  try {
    const {
      source,
      destination,
      weight,
      volume,
      shipmentType
    } = req.body;

    const shipment = await Shipment.create({
      createdBy: req.user._id,
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
