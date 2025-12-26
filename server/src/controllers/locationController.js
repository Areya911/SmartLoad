const Truck = require("../models/Truck");

exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  const truck = await Truck.findOne({ owner: req.user._id });

  if (!truck) {
    return res.status(404).json({ message: "Truck not found" });
  }

  truck.currentLocation = { lat, lng };
  await truck.save();

  res.json({ message: "Location updated", location: truck.currentLocation });
};
