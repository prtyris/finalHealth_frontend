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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Reschedule Appointment
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-medium mb-1">New Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Appointment Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onConfirm(date, type)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
