const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");
const Booking = require("../models/Booking");

const UTILIZATION_CAP = 0.85;

exports.optimizeShipments = async () => {
  const shipments = await Shipment.find({ status: "pending" });
  const trucks = await Truck.find({ isAvailable: true });

  // Track remaining usable capacity in memory
  const truckState = trucks.map((truck) => ({
    truck,
    maxUsableWeight: truck.capacityWeight * UTILIZATION_CAP,
    maxUsableVolume: truck.capacityVolume * UTILIZATION_CAP,
    usedWeight: 0,
    usedVolume: 0
  }));

  const assignments = [];

  for (let shipment of shipments) {
    let bestTruck = null;
    let bestScore = Infinity;

    for (let t of truckState) {
      const newUsedWeight = t.usedWeight + shipment.weight;
      const newUsedVolume = t.usedVolume + shipment.volume;

      // 🚧 Safety + capacity check
      if (
        newUsedWeight <= t.maxUsableWeight &&
        newUsedVolume <= t.maxUsableVolume
      ) {
        const weightLeft = t.maxUsableWeight - newUsedWeight;
        const volumeLeft = t.maxUsableVolume - newUsedVolume;

        const score = weightLeft + volumeLeft;

        if (score < bestScore) {
          bestScore = score;
          bestTruck = t;
        }
      }
    }

    if (!bestTruck) {
      // No safe truck for this shipment
      continue;
    }

    // Create booking
    const booking = await Booking.create({
      shipment: shipment._id,
      truck: bestTruck.truck._id
    });

    // Update shipment
    shipment.status = "assigned";
    await shipment.save();

    // Update in-memory truck usage
    bestTruck.usedWeight += shipment.weight;
    bestTruck.usedVolume += shipment.volume;

    // If truck hits utilization cap, mark unavailable
    if (
      bestTruck.usedWeight >= bestTruck.maxUsableWeight ||
      bestTruck.usedVolume >= bestTruck.maxUsableVolume
    ) {
      bestTruck.truck.isAvailable = false;
      await bestTruck.truck.save();
    }

    assignments.push(booking);
  }

  return assignments;
};
