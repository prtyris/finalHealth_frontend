import { useState, useEffect } from "react";

export default function RescheduleAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onConfirm,
}) {
  // ✅ Hooks ALWAYS called
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const syncAppointmentState = () => {
    if (!appointment) return;

    setDate(appointment.appointment_date);
    setType(appointment.appointment_type);
  };

  useEffect(() => {
    const syncAppointmentState = () => {
      if (!appointment) return;

      setDate(appointment.appointment_date);
      setType(appointment.appointment_type);
    };
    syncAppointmentState();
  }, [appointment]);

  // ✅ Conditional rendering AFTER hooks
  if (!isOpen || !appointment) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal */}
    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border-4 border-blue-600 p-6 z-10">
     <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center">
      Reschedule Appointment
    </h2>

    {/* Patient + Doctor + Clinic Info */}
    <div className="text-center text-sm text-gray-600 mb-4 space-y-1">
      <p className="font-medium text-gray-800">
        {appointment.patient_f_name}{" "}
        {appointment.patient_m_name || ""}{" "}
        {appointment.patient_l_name}
      </p>

      <p>
        Doctor: <span className="font-medium">{appointment.doctor_name}</span>
      </p>

      <p>
        Clinic: <span className="font-medium">{appointment.clinic_name}</span>
      </p>
    </div>

      <div className="space-y-4 text-sm">
        <div>
          <label className="block font-medium mb-1">New Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Appointment Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          className="px-5 py-2 bg-red-700 rounded-lg hover:bg-red-300 transition text-white"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          onClick={() => onConfirm(date, type)}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

}
