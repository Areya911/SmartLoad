import { useEffect, useState } from "react";

export default function DriverDashboard({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const updateStatus = (id, action) => {
    fetch(`http://localhost:5000/api/bookings/${id}/${action}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBookings(b =>
          b.map(x =>
            x._id === id
              ? { ...x, status: action === "start" ? "in_transit" : "delivered" }
              : x
          )
        );
      });
  };

  return (
    <div>
      <h2>My Trips</h2>

      {bookings.map(b => (
        <div key={b._id} className="card">
          <p>
            {b.shipment.source} → {b.shipment.destination}
          </p>
          <p>Status: {b.status}</p>

          {b.status === "assigned" && (
            <button onClick={() => updateStatus(b._id, "start")}>
              Start Trip
            </button>
          )}

          {b.status === "in_transit" && (
            <button onClick={() => updateStatus(b._id, "complete")}>
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
