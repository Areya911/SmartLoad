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
  const pendingCount = await Shipment.countDocuments({ status: "pending" });

  if (pendingCount === 0) {
    return {
      assignments: [],
      explanations: []
    };
  }
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
    const evaluatedTrucks = [];

    for (let t of truckState) {
      const newWeight = t.usedWeight + shipment.weight;
      const newVolume = t.usedVolume + shipment.volume;

      // ❌ Capacity violation
      if (newWeight > t.maxWeight || newVolume > t.maxVolume) {
        evaluatedTrucks.push({
          truckId: t.truck._id,
          truckName: t.truck.name,
          truckNumber: t.truck.truckNumber,
          truckType: t.truck.truckType,
          status: "Rejected",
          reason: "Exceeds safety utilization limit"
        });
        continue;
      }

      const wasteScore =
        (t.maxWeight - newWeight) +
        (t.maxVolume - newVolume) +
        DRIVER_PENALTY[t.driverFatigue];

      evaluatedTrucks.push({
        truckId: t.truck._id,
        truckName: t.truck.name,
        truckNumber: t.truck.truckNumber,
        truckType: t.truck.truckType,
        status: "Considered",
        reason: `Waste score = ${wasteScore}`
      });

      if (wasteScore < bestScore) {
        bestScore = wasteScore;
        bestTruck = t;
      }
    }

    // ❌ No assignment possible
    if (!bestTruck) {
      explanations.push({
        shipment: {
          id: shipment._id,
          name: shipment.name
        },
        finalDecision: null,
        confidence: 0,
        evaluatedTrucks
      });
      continue;
    }

    // ✅ Create booking
    const booking = await Booking.create({
      shipment: shipment._id,
      truck: bestTruck.truck._id
    });

    shipment.status = "assigned";
    await shipment.save();

    bestTruck.truck.isAvailable = false;
    await bestTruck.truck.save();

    bestTruck.usedWeight += shipment.weight;
    bestTruck.usedVolume += shipment.volume;

    assignments.push(booking);

    explanations.push({
      shipment: {
        id: shipment._id,
        name: shipment.name
      },
      finalDecision: {
        truckId: bestTruck.truck._id,
        truckName: bestTruck.truck.name,
        truckNumber: bestTruck.truck.truckNumber
      },
      confidence: Math.max(0.5, 1 - bestScore / 10000),
      evaluatedTrucks
    });
  }

  const OptimizationRun = require("../models/OptimizationRun");

// after assignments + explanations are ready
  await OptimizationRun.create({
    executedBy: null, // or req.user._id if passed
    assignments,
    explanations
  });
  return { assignments, explanations };

};


