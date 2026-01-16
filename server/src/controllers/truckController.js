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

// @desc    Get trucks owned by logged-in truck owner
// @route   GET /api/trucks/my
// @access  Truck Owner
exports.getMyTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find({
      owner: req.user._id
    });

    res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTruck = async (req, res) => {
  const truck = await Truck.findById(req.params.id);

  if (!truck) {
    return res.status(404).json({ message: "Truck not found" });
  }

  if (!truck.owner.equals(req.user._id)) {
    return res.status(403).json({ message: "Not your truck" });
  }

  if (!truck.isAvailable) {
    return res
      .status(400)
      .json({ message: "Cannot edit truck while assigned" });
  }

  Object.assign(truck, req.body);
  await truck.save();

  res.json(truck);
};

exports.deleteTruck = async (req, res) => {
  const truck = await Truck.findById(req.params.id);

  if (!truck) {
    return res.status(404).json({ message: "Truck not found" });
  }

  if (!truck.owner.equals(req.user._id)) {
    return res.status(403).json({ message: "Not your truck" });
  }

  if (!truck.isAvailable) {
    return res
      .status(400)
      .json({ message: "Cannot delete truck while assigned" });
  }

  await truck.deleteOne();
  res.json({ message: "Truck deleted" });
};
