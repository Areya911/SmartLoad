const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");
const Booking = require("../models/Booking");

exports.optimizeShipments = async () => {
  const shipments = await Shipment.find({ status: "pending" });
  const trucks = await Truck.find({ isAvailable: true });

  // 🔁 Track remaining capacity in memory
  const truckState = trucks.map((truck) => ({
    truck,
    remainingWeight: truck.capacityWeight,
    remainingVolume: truck.capacityVolume
  }));

  const assignments = [];

  for (let shipment of shipments) {
    // find a truck that can still fit this shipment
    const suitable = truckState.find(
      (t) =>
        t.remainingWeight >= shipment.weight &&
        t.remainingVolume >= shipment.volume
    );

    if (!suitable) {
      // no truck can handle this shipment
      continue;
    }

    // create booking
    const booking = await Booking.create({
      shipment: shipment._id,
      truck: suitable.truck._id
    });

    // update shipment
    shipment.status = "assigned";
    await shipment.save();

    // reduce truck capacity
    suitable.remainingWeight -= shipment.weight;
    suitable.remainingVolume -= shipment.volume;

    // if truck is effectively full, mark unavailable
    if (
      suitable.remainingWeight === 0 ||
      suitable.remainingVolume === 0
    ) {
      suitable.truck.isAvailable = false;
      await suitable.truck.save();
    }

    assignments.push(booking);
  }

  return assignments;
};
