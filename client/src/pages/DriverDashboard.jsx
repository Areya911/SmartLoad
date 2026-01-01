import { useEffect, useState } from "react";

export default function DriverDashboard() {
  const token = localStorage.getItem("token");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "http://localhost:5000/api/bookings/my-assignments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      setAssignments(data);
    }

    load();
  }, [token]);

  const updateShipmentStatus = async (shipmentId, action) => {
    await fetch(
      `http://localhost:5000/api/shipments/${shipmentId}/${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // refresh UI
    setAssignments(a =>
      a.map(b =>
        b.shipment._id === shipmentId
          ? {
              ...b,
              shipment: {
                ...b.shipment,
                status:
                  action === "in-transit"
                    ? "in_transit"
                    : "delivered"
              }
            }
          : b
      )
    );
  };

  return (
    <div className="container">
      <h1>🚛 Driver Dashboard</h1>

      {assignments.length === 0 ? (
        <p>No assigned shipments.</p>
      ) : (
        assignments.map(b => (
          <div key={b._id} className="card">
            <h3>{b.shipment.name}</h3>

            <p>
              {b.shipment.source} → {b.shipment.destination}
            </p>

            <p>
              <b>Truck:</b> {b.truck.name} ({b.truck.truckNumber})
            </p>

            <p>
              <b>Status:</b> {b.shipment.status}
            </p>

            {b.shipment.status === "assigned" && (
              <button
                onClick={() =>
                  updateShipmentStatus(b.shipment._id, "in-transit")
                }
              >
                Start Trip
              </button>
            )}

            {b.shipment.status === "in_transit" && (
              <button
                onClick={() =>
                  updateShipmentStatus(b.shipment._id, "delivered")
                }
              >
                Mark Delivered
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
