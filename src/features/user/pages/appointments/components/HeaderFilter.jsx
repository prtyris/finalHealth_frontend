import { useEffect, useState } from "react";
import { useDoctors } from "../../../context/doctors/useDoctors";
import { useClinics } from "../../../context/clinics/useClinics";
import { useQueues } from "../../../context/queues/useQueues";
import { Link } from "react-router-dom";

import AddAppointmentModal from "../modals/AddAppointmentModal";

export default function HeaderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  const { approvedDoctors, getAllApprovedDoctorsOfUser } = useDoctors();
  const { clinics, getAllClinicsOfDoctor } = useClinics();
  const { clearQueues } = useQueues();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);


  const [doctorId, setDoctorId] = useState(
    localStorage.getItem("selectedDoctorId") || ""
  );
  const [clinicId, setClinicId] = useState(
    localStorage.getItem("selectedClinicId") || ""
  );

  // Load doctors on mount
  useEffect(() => {
    getAllApprovedDoctorsOfUser();
  }, []);

  // Load clinics when doctor changes
  useEffect(() => {
    if (doctorId) {
      getAllClinicsOfDoctor(doctorId);
    }
  }, [doctorId]);

  const handleDoctorChange = (id) => {
    setDoctorId(id);
    setClinicId("");

    if (id) {
      localStorage.setItem("selectedDoctorId", id);
    } else {
      localStorage.removeItem("selectedDoctorId");
    }

    localStorage.removeItem("selectedClinicId");

    clearQueues();

    window.dispatchEvent(new Event("appointments:selectionChanged"));
  };

  const handleClinicChange = (id) => {
    setClinicId(id);

    if (id) {
      localStorage.setItem("selectedClinicId", id);
    } else {
      localStorage.removeItem("selectedClinicId");
      clearQueues();
    }

    window.dispatchEvent(new Event("appointments:selectionChanged"));
  };

  const selectedDoctor = approvedDoctors.find((d) => d.doctor_id == doctorId);
  const selectedClinic = clinics.find((c) => c.clinic_id == clinicId);

  return (
    <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Doctor */}
      <select
        className="border rounded px-3 py-2"
        value={doctorId}
        onChange={(e) => handleDoctorChange(e.target.value)}
      >
        <option value="">Select Doctor</option>
        {approvedDoctors.map((d) => (
          <option key={d.doctor_id} value={d.doctor_id}>
            Dr. {d.f_name} {d.l_name}
          </option>
        ))}
      </select>

      {/* Clinic */}
      <select
        className="border rounded px-3 py-2"
        value={clinicId}
        onChange={(e) => handleClinicChange(e.target.value)}
        disabled={!doctorId}
      >
        <option value="">Select Clinic</option>
        {clinics.map((c) => (
          <option key={c.clinic_id} value={c.clinic_id}>
            {c.clinic_name}
          </option>
        ))}
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search appointments..."
        className="border rounded px-3 py-2"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Status */}
      {/* <select
        className="border rounded px-3 py-2"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select> */}

      <button
        className="bg-blue-600 text-white rounded px-4 py-2"
        type="button"
        onClick={() => {
          if (!doctorId || !clinicId) {
            setShowWarningModal(true);
          } else {
            setShowAddModal(true);
          }
        }}
      >
        + Add Appointment
      </button>

      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        doctor={selectedDoctor || null}
        clinic={selectedClinic || null}
      />

     {/* Warning Modal */}
    {showWarningModal && (
      <div className="fixed inset-0 bg-blue-50/60 backdrop-blur-[2px] flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl border-4 border-blue-600 text-center">
          
          <h2 className="text-blue-700 font-semibold text-lg mb-3">
            Selection Required
          </h2>

          <p className="text-gray-600 text-sm mb-6">
            Please select a doctor and clinic first before adding an appointment.
          </p>

          <button
            onClick={() => setShowWarningModal(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            ← Back
          </button>
        </div>
      </div>
    )}


    </div>
  );
}
