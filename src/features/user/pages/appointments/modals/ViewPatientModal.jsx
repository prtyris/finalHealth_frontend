export default function ViewPatientModal({ isOpen, onClose, appointment }) {
  if (!isOpen || !appointment) return null;

  const fullName = `${appointment.patient_f_name} ${
    appointment.patient_m_name || ""
  } ${appointment.patient_l_name}`.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Patient Information
        </h2>

        <div className="space-y-2 text-sm text-gray-800">
          <p>
            <span className="font-semibold">Full Name:</span> {fullName}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {appointment.gender}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(appointment.date_of_birth).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Contact Number:</span>{" "}
            {appointment.contact_number}
          </p>
          <p>
            <span className="font-semibold">Backup Contact:</span>{" "}
            {appointment.backup_contact || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {appointment.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {appointment.address}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
