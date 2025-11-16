import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";

import GuestRoute from "./components/GuestRoutes.jsx";

export default function LandingRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LandingPage />
          </GuestRoute>
        }
      />
    </Routes>
  );
}
