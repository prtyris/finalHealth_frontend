import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("admin_token");

  // No token → kick them out and send to landing
  if (!token) {
    return <Navigate to="/admin/admin-login" replace />;
  }

  return children;
}
