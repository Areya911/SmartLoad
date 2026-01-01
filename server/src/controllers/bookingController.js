const Booking = require("../models/Booking");

// Driver starts trip
exports.startTrip = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "in_transit";
  await booking.save();

  res.json({ message: "Trip started", booking });
};

// Driver completes trip
exports.completeTrip = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "delivered";
  await booking.save();

  res.json({ message: "Shipment delivered", booking });
};

// Driver sees their bookings
exports.getDriverBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("shipment")
    .populate("truck")
    .where("truck.owner")
    .equals(req.user._id);

  res.json(bookings);
};

exports.getDriverAssignments = async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: "truck",
      match: { owner: req.user._id },
      select: "name truckNumber"
    })
    .populate({
      path: "shipment",
      select: "name source destination status"
    });

  // Remove bookings not owned by driver
  const filtered = bookings.filter(b => b.truck);

  res.json(filtered);
};