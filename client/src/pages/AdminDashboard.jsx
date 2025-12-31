import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllTrucks,
  getAllShipments
} from "../services/api";
import { runOptimizationWithExplain } from "../services/optimizationApi";
import ExplanationCard from "../components/ExplanationCard";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [shipments, setShipments] = useState([]);

  // Load trucks + shipments on page load
  useEffect(() => {
    async function loadData() {
      if (!token) return;

      const t = await getAllTrucks(token);
      const s = await getAllShipments(token);

      setTrucks(t);
      setShipments(s);
    }
    loadData();
  }, [token]);

  const handleOptimize = async () => {
    setLoading(true);
    const res = await runOptimizationWithExplain(token);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>SmartLoad Admin Dashboard</h1>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/shipments/new">
          <button>Create Shipment</button>
        </Link>

        <Link to="/trucks/new">
          <button>Create Truck</button>
        </Link>

        <button onClick={handleOptimize}>
          {loading ? "Optimizing..." : "Run Optimization"}
        </button>
      </div>

      {/* TRUCK LIST */}
      <div className="card">
        <h3>🚛 Trucks</h3>
        {trucks.length === 0 ? (
          <p>No trucks created yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Truck No</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Volume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((t) => (
                <tr key={t._id}>
                  <td>{t.truckNumber}</td>
                  <td>{t.truckType}</td>
                  <td>{t.capacityWeight}</td>
                  <td>{t.capacityVolume}</td>
                  <td>{t.isAvailable ? "Available" : "Busy"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* SHIPMENT LIST */}
      <div className="card">
        <h3>📦 Shipments</h3>
        {shipments.length === 0 ? (
          <p>No shipments created yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Weight</th>
                <th>Volume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s._id}>
                  <td>{s.source}</td>
                  <td>{s.destination}</td>
                  <td>{s.weight}</td>
                  <td>{s.volume}</td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EMPTY STATE */}
      {!loading && !result && (
        <div className="card">
          <p>
            No optimization has been run yet.
            <br />
            Create trucks and shipments, then click{" "}
            <b>Run Optimization</b>.
          </p>
        </div>
      )}

      {/* NO PENDING SHIPMENTS */}
      {result && result.explanations?.length === 0 && (
        <div className="card warning">
          No pending shipments found.
        </div>
      )}

      {/* OPTIMIZATION RESULTS */}
      {result?.explanations?.map((exp) => (
        <ExplanationCard
          key={exp.shipmentId}
          explanation={exp}
        />
      ))}
    </div>
  );
}
