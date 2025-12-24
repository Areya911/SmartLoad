import ConfidenceBadge from "./ConfidenceBadge";

export default function ExplanationCard({ explanation }) {
  return (
    <div className="card">
      <h3>Shipment {explanation.shipmentId}</h3>

      <p>
        Assigned Truck: <b>{explanation.finalDecision.truckId}</b>
      </p>

      <ConfidenceBadge confidence={explanation.confidence} />

      <ul>
        {explanation.evaluatedTrucks.map((t) => (
          <li key={t.truckId}>
            {t.truckType} → {t.reason} ({t.details})
          </li>
        ))}
      </ul>
    </div>
  );
}
