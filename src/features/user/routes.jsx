import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Appointments from "./pages/appointments/Appointments";
import DoctorSchedule from "./pages/doctor-schedule/DoctorSchedule";
import Patients from "./pages/patients/Patients";
import SubscriptionView from "./pages/subscription/SubscriptionView";
import ProfileView from "./pages/profile/ProfileView";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/doctor-schedule" element={<DoctorSchedule />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  );
}
