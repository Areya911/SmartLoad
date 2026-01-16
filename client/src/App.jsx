import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTruck from "./pages/CreateTruck";
import CreateShipment from "./pages/CreateShipment";
import TruckOwnerDashboard from "./pages/TruckOwnerDashboard";
import ShipmentOwnerDashboard from "./pages/ShipmentOwnerDashboard";
import "./styles/theme.css";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/truck-owner" element={<TruckOwnerDashboard />} />
        <Route path="/shipment-owner" element={<ShipmentOwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
