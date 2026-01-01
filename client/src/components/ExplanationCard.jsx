import ConfidenceBadge from "./ConfidenceBadge";
import TruckComparisonTable from "./TruckComparisonTable";

export default function ExplanationCard({ explanation }) {
  const {
    shipment,
    finalDecision,
    confidence,
    evaluatedTrucks
  } = explanation;

  return (
    <div className="card">
      <h3>📦 Shipment: {shipment.name}</h3>

      {finalDecision ? (
        <>
          <p>
            🚛 Assigned Truck:{" "}
            <b>
              {finalDecision.truckName} ({finalDecision.truckNumber})
            </b>
          </p>

          <ConfidenceBadge confidence={confidence} />

          <TruckComparisonTable
            trucks={evaluatedTrucks}
            selectedTruckId={finalDecision.truckId}
          />
        </>
      ) : (
        <p className="warning">
           No suitable truck found for this shipment
        </p>
      )}
    </div>
  );
}
