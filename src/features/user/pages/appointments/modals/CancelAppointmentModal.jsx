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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">
          Cancel Appointment
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Please provide a reason for cancelling this appointment.
        </p>

        <textarea
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Reason for cancellation..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleConfirm}
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
