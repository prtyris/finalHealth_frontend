import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Subscribers from "./pages/subscriber/Subscribers";
import Users from "./pages/users/Users";
import VerifyDoctors from "./pages/verifydoctor/VerifyDoctors";

//for dashboard admin
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/subscribers" element={<Subscribers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/verify-doctors" element={<VerifyDoctors />} />
    </Routes>
  );
}
