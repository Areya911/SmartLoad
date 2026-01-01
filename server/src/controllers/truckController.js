const Truck = require("../models/Truck");

// @desc    Create truck
// @route   POST /api/trucks
// @access  Admin / Truck Owner
exports.createTruck = async (req, res) => {
  try {
    const {
      name,
      truckNumber,
      truckType,
      capacityWeight,
      capacityVolume
    } = req.body;

    const truck = await Truck.create({
      owner: req.user._id, // 🔑 REQUIRED by schema
      name,
      truckNumber,
      truckType,
      capacityWeight,
      capacityVolume
    });

    res.status(201).json(truck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all trucks
// @route   GET /api/trucks
// @access  Admin
exports.getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().populate(
      "owner",
      "name email"
    );
    res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
