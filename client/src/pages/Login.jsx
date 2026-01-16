import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please choose how you want to login");
      return;
    }

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const res = await loginUser(email, password);

    if (!res.token) {
      alert(res.message || "Login failed");
      return;
    }

    // 🔐 SECURITY CHECK
    
    const { role } = res.user;

// 🔐 SECURITY CHECK
    if (role !== selectedRole) {
      alert(
        `You are registered as "${role}". You cannot login as "${selectedRole}".`
      );
      return;
    }

    // Save auth
    localStorage.setItem("token", res.token);
    localStorage.setItem("role", role);

    // 🚦 Role-based routing
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "truck_owner") {
      navigate("/truck-owner");
    } else if (role === "shipment_owner") {
      navigate("/shipment-owner");
    }

  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />
 <br />
  <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              onClick={() => setSelectedRole("admin")}
            >
              Login as Admin
            </button>
 <br />
  <br />

            <button
              type="submit"
              onClick={() => setSelectedRole("truck_owner")}
            >
              Login as Truck Owner / Driver
            </button>
 <br />
  <br />
            <button
              type="submit"
              onClick={() => setSelectedRole("shipment_owner")}
            >
              Login as Shipment Owner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
