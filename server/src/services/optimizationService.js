const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");
const Booking = require("../models/Booking");

exports.optimizeShipments = async () => {
  // get pending shipments
  const shipments = await Shipment.find({ status: "pending" });

  // get available trucks
  const trucks = await Truck.find({ isAvailable: true });

  const assignments = [];

  for (let shipment of shipments) {
    // find first truck that can carry this shipment
    const suitableTruck = trucks.find(
      (truck) =>
        truck.capacityWeight >= shipment.weight &&
        truck.capacityVolume >= shipment.volume
    );

    if (suitableTruck) {
      // create booking
      const booking = await Booking.create({
        shipment: shipment._id,
        truck: suitableTruck._id
      });

      // update shipment + truck
      shipment.status = "assigned";
      suitableTruck.isAvailable = false;

      await shipment.save();
      await suitableTruck.save();

      assignments.push(booking);
    }
  }

  return assignments;
};
