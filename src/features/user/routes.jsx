import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
