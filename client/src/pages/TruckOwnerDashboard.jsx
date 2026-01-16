import { useEffect, useState } from "react";
import { getMyTrucks } from "../services/api";
import { Link } from "react-router-dom";
import ActionMenu from "../components/ActionMenu";
import { useNavigate } from "react-router-dom";

export default function TruckOwnerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [trucks, setTrucks] = useState([]);
  const handleDelete = async (id) => {
  await deleteTruck(id);
  setTrucks(prev => prev.filter(t => t._id !== id));
};

  

  useEffect(() => {
    async function load() {
      const data = await getMyTrucks(token);
      setTrucks(data);
    }
    load();
  }, [token]);

  return (
    <div className="container">
      <h1>Truck Owner Dashboard</h1>

      <Link to="/trucks/new">
        <button>Add New Truck</button>
      </Link>

      <div className="card">
        <h3>My Trucks</h3>

        {trucks.length === 0 ? (
          <p>No trucks added yet.</p>
        ) : (
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Truck No</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {trucks.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.truckNumber}</td>
                <td>{t.truckType}</td>
                <td>
                  {t.capacityWeight}kg / {t.capacityVolume}m³
                </td>
                <td>{t.isAvailable ? "Available" : "Busy"}</td>
                <td>
                  <ActionMenu
                    disabled={!t.isAvailable}
                    onEdit={() => navigate(`/trucks/edit/${t._id}`)}
                    onDelete={() => handleDelete(t._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

          </table>
        )}
      </div>
    </div>
  );
}
