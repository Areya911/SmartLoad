import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTruck from "./pages/CreateTruck";
import CreateShipment from "./pages/CreateShipment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/trucks/new" element={<CreateTruck />} />
        <Route path="/shipments/new" element={<CreateShipment />} />
      </Routes>
    </BrowserRouter>
  );
}
