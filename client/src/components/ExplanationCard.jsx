import ConfidenceBadge from "./ConfidenceBadge";
import TruckComparisonTable from "./TruckComparisonTable";

export default function ExplanationCard({ explanation }) {
  if (!explanation) {
    return null;
  }

  const {
    shipmentId,
    shipmentName,
    finalDecision,
    confidence,
    evaluatedTrucks = []
  } = explanation;

  return (
    <div className="card">
      <h3>
        Shipment: {shipmentName || shipmentId}
      </h3>

      {finalDecision?.truckNumber ? (
        <>
          <p>
            Assigned Truck:{" "}
            <b>{finalDecision.truckNumber}</b>
          </p>

          {/* Only show confidence if valid */}
          {typeof confidence === "number" && (
            <ConfidenceBadge confidence={confidence} />
          )}

          {evaluatedTrucks.length > 0 && (
            <TruckComparisonTable
              trucks={evaluatedTrucks}
              selectedTruckId={finalDecision.truckId}
            />
          )}
        </>
      ) : (
        <p className="warning">
          No suitable truck found
        </p>
      )}
    </div>
  );
}
