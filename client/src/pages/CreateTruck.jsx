import { useNavigate } from "react-router-dom";
import { createTruck } from "../services/api";

export default function CreateTruck() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const truck = {
      name: form.name.value,
      truckNumber: form.truckNumber.value,
      truckType: form.truckType.value,
      capacityWeight: Number(form.capacityWeight.value),
      capacityVolume: Number(form.capacityVolume.value),
    };

    const res = await createTruck(truck, token);

    if (res._id) {
      alert("Truck created successfully");
      navigate("/dashboard");
    } else {
      alert(res.message || "Failed to create truck");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Truck</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Truck Name"
            required
          />

          <input
            name="truckNumber"
            placeholder="Truck Number (KA01AB1234)"
            required
          />

          <select name="truckType" required>
            <option value="">Select Truck Type</option>
            <option value="open">Open Truck</option>
            <option value="container">Container</option>
            <option value="refrigerated">Refrigerated</option>
          </select>

          <input
            name="capacityWeight"
            type="number"
            placeholder="Max Weight (kg)"
            required
          />

          <input
            name="capacityVolume"
            type="number"
            placeholder="Max Volume (m³)"
            required
          />

          <button type="submit">Create Truck</button>
        </form>
      </div>
    </div>
  );
}
