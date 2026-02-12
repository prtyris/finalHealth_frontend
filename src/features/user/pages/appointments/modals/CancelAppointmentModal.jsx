import { useState } from "react";

export default function CancelAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onConfirm,
}) {
  const [reason, setReason] = useState("");

  if (!isOpen || !appointment) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      alert("Please provide a cancellation reason.");
      return;
    }

    onConfirm(reason);
    setReason("");
  };

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
          Cancel Appointment
        </h2>

        {/* Patient + Doctor + Clinic */}
        <div className="text-center text-sm text-gray-600 mb-4 space-y-1">
          <p className="font-medium text-gray-800">
            {appointment.patient_f_name}{" "}
            {appointment.patient_m_name || ""}{" "}
            {appointment.patient_l_name}
          </p>

          <p>
            Doctor:{" "}
            <span className="font-medium">{appointment.doctor_name}</span>
          </p>

          <p>
            Clinic:{" "}
            <span className="font-medium">{appointment.clinic_name}</span>
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Please provide a reason for cancelling this appointment.
        </p>

        <textarea
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Reason for cancellation..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="mt-6 flex justify-center gap-3">
          <button
            className="px-5 py-2 bg-blue-700 rounded-lg hover:bg-blue-300 transition text-white"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
            onClick={handleConfirm}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );

}
