export default function TruckComparisonTable({
  trucks,
  selectedTruckId
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Truck</th>
          <th>Type</th>
          <th>Status</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {trucks.map((t) => (
          <tr
            key={t.truckId}
            style={{
              background:
                t.truckId === selectedTruckId
                  ? "#e6ffe6"
                  : "transparent"
            }}
          >
            <td>{t.truckNumber}</td>
            <td>{t.truckType}</td>
            <td>{t.reason}</td>
            <td>{t.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
