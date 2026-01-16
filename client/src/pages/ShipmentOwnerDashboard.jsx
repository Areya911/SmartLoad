import { useEffect, useState } from "react";

export default function ShipmentOwnerDashboard() {
  const token = localStorage.getItem("token");
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "http://localhost:5000/api/shipments/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      setShipments(data);
    }
    load();
  }, [token]);

  const deleteShipment = async (id) => {
    if (!window.confirm("Delete this shipment?")) return;

    await fetch(
      `http://localhost:5000/api/shipments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setShipments(s => s.filter(x => x._id !== id));
  };

  return (
    <div className="container">
      <h1>My Shipments</h1>

      {shipments.length === 0 ? (
        <p>No shipments created yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Weight</th>
              <th>Volume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.source}</td>
                <td>{s.destination}</td>
                <td>{s.weight}</td>
                <td>{s.volume}</td>
                <td>{s.status}</td>

                <td>
                  {s.status === "pending" ? (
                    <>
                      <button>Edit</button>
                      <button
                        onClick={() => deleteShipment(s._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span style={{ color: "gray" }}>
                      Locked
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
