const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");

exports.getETA = async (req, res) => {
  const { shipmentId } = req.params;

  const shipment = await Shipment.findById(shipmentId);
  if (!shipment) {
    return res.status(404).json({ message: "Shipment not found" });
  }

  const truck = await Truck.findOne({ owner: req.user._id });
  if (!truck || !truck.currentLocation) {
    return res.status(400).json({ message: "Truck location unknown" });
  }

  const distanceKm = getDistanceKm(
    truck.currentLocation.lat,
    truck.currentLocation.lng,
    shipment.destinationLat,
    shipment.destinationLng
  );

  const etaHours = distanceKm / truck.averageSpeedKmph;

  res.json({
    distanceKm: distanceKm.toFixed(2),
    etaHours: etaHours.toFixed(2),
    etaMinutes: Math.round(etaHours * 60)
  });
};
