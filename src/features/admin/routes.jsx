import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Subscribers from "./pages/subscriber/Subscribers";
import Users from "./pages/users/Users";
import VerifyDoctors from "./pages/verifydoctor/VerifyDoctors";

//for dashboard admin
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { AdminProvider } from "./context/AdminProvider";

export default function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin-subscribers"
          element={
            <ProtectedRoutes>
              <Subscribers />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedRoutes>
              <Users />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin-verify-doctors"
          element={
            <ProtectedRoutes>
              <VerifyDoctors />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AdminProvider>
  );
}
