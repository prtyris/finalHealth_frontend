import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Appointments from "./pages/appointments/Appointments";
import DoctorSchedule from "./pages/doctor-schedule/DoctorSchedule";
import Patients from "./pages/patients/Patients";
import SubscriptionView from "./pages/subscription/SubscriptionView";
import ProfileView from "./pages/profile/ProfileView";
import CreateAppointment from "./pages/appointments-2/CreateAppointment";
import RegisterPatient from "./pages/appointments-2/RegisterPatient";
import MedicalHistoryPage from "./pages/patients/pages/MedicalHistoryPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/appointments/create" element={<CreateAppointment />} />
      <Route
        path="/appointments/create-patient"
        element={<RegisterPatient />}
      />
      <Route path="/doctor-schedule" element={<DoctorSchedule />} />
      <Route path="/patients" element={<Patients />} />
      <Route
        path="/patients/:patientId/medical-history"
        element={<MedicalHistoryPage />}
      />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  );
}
