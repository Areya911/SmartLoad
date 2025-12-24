const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");
const Booking = require("../models/Booking");

exports.optimizeShipments = async () => {
  const shipments = await Shipment.find({ status: "pending" });
  const trucks = await Truck.find({ isAvailable: true });

  const assignments = [];

  for (let shipment of shipments) {
    // find suitable truck index
    const truckIndex = trucks.findIndex(
      (truck) =>
        truck.capacityWeight >= shipment.weight &&
        truck.capacityVolume >= shipment.volume
    );

    if (truckIndex === -1) {
      // no truck available for this shipment
      continue;
    }

    const suitableTruck = trucks[truckIndex];

    // create booking
    const booking = await Booking.create({
      shipment: shipment._id,
      truck: suitableTruck._id
    });

    // update states
    shipment.status = "assigned";
    suitableTruck.isAvailable = false;

    await shipment.save();
    await suitableTruck.save();

    // remove truck from memory so it can't be reused
    trucks.splice(truckIndex, 1);

    assignments.push(booking);
  }

  return assignments;
};
