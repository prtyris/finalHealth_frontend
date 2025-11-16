import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("user_token");

  // Logged-in user trying to access landing/login/register → redirect
  if (token) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}
