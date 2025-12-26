const Truck = require("../models/Truck");
const Shipment = require("../models/Shipment");
const Booking = require("../models/Booking");

const UTILIZATION_CAPS = {
  open: 0.9,
  container: 0.85,
  refrigerated: 0.75
};

const DRIVER_PENALTY = {
  low: 0,
  medium: 500,
  high: 1500
};

exports.optimizeShipmentsWithExplainability = async () => {
  const shipments = await Shipment.find({ status: "pending" });
  const trucks = await Truck.find({ isAvailable: true });

  const truckState = trucks.map((truck) => ({
    truck,
    usedWeight: 0,
    usedVolume: 0,
    maxWeight: truck.capacityWeight * UTILIZATION_CAPS[truck.truckType],
    maxVolume: truck.capacityVolume * UTILIZATION_CAPS[truck.truckType],
    driverFatigue: truck.driverFatigue || "low"
  }));

  const assignments = [];
  const explanations = [];

  for (let shipment of shipments) {
    let bestTruck = null;
    let bestScore = Infinity;
    const evaluated = [];

    for (let t of truckState) {
      const newWeight = t.usedWeight + shipment.weight;
      const newVolume = t.usedVolume + shipment.volume;

      // ❌ Capacity or safety violation
      if (newWeight > t.maxWeight || newVolume > t.maxVolume) {
        evaluated.push({
          truckId: t.truck._id,
          truckType: t.truck.truckType,
          reason: "Rejected",
          details: "Exceeds safety utilization limit"
        });
        continue;
      }

      const wasteScore =
        (t.maxWeight - newWeight) +
        (t.maxVolume - newVolume) +
        DRIVER_PENALTY[t.driverFatigue];

      evaluated.push({
        truckId: t.truck._id,
        truckType: t.truck.truckType,
        reason: "Considered",
        details: `Waste score = ${wasteScore}`
      });

      if (wasteScore < bestScore) {
        bestScore = wasteScore;
        bestTruck = t;
      }
    }

    if (!bestTruck) {
      explanations.push({
        shipmentId: shipment._id,
        evaluatedTrucks: evaluated,
        finalDecision: "No suitable truck found"
      });
      continue;
    }

    // Create booking
    const booking = await Booking.create({
      shipment: shipment._id,
      truck: bestTruck.truck._id
    });

    shipment.status = "assigned";
    await shipment.save();

    bestTruck.usedWeight += shipment.weight;
    bestTruck.usedVolume += shipment.volume;

    assignments.push(booking);

    explanations.push({
      shipmentId: shipment._id,
      evaluatedTrucks: evaluated,
      finalDecision: {
        truckId: bestTruck.truck._id,
        reason: "Best-fit with safety and driver constraints"
      }
    });
  }

  return { assignments, explanations };
};
