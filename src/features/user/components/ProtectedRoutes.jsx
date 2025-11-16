import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("user_token");

  // No token → kick them out and send to landing
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
