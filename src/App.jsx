import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingRoutes from "./features/landing/routes.jsx";
import UserRoutes from "./features/user/routes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LandingRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
