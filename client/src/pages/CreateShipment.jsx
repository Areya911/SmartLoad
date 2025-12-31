import { useNavigate } from "react-router-dom";
import { createShipment } from "../services/api";

export default function CreateShipment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const shipment = {
      name: form.name.value,
      weight: Number(form.weight.value),
      volume: Number(form.volume.value),
      source: form.source.value,
      destination: form.destination.value,
    };

    const res = await createShipment(shipment, token);

    if (res._id) {
      alert("Shipment created successfully");
      navigate("/dashboard");
    } else {
      alert(res.message || "Failed to create shipment");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Shipment</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Shipment Name"
            required
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            required
          />

          <input
            name="volume"
            type="number"
            placeholder="Volume (m³)"
            required
          />

          <input
            name="source"
            placeholder="Source Location"
            required
          />

          <input
            name="destination"
            placeholder="Destination"
            required
          />

          <button type="submit">Create Shipment</button>
        </form>
      </div>
    </div>
  );
}
