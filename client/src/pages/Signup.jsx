import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signupUser(name, email, password);

    if (res._id) {
      alert("Signup successful. Please login.");
      navigate("/login");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">Signup</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
