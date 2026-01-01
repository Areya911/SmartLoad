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
            <td>
              {t.truckName} ({t.truckNumber})
            </td>
            <td>{t.truckType}</td>
            <td>{t.status}</td>
            <td>{t.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
