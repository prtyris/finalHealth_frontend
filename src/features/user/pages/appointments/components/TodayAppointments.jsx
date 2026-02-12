import { useState } from "react";

import { useAppointments } from "../../../context/appointments/useAppointments";
import { useQueues } from "../../../context/queues/useQueues";

import StatusBadge from "./StatusBadge";

import ViewPatientModal from "../modals/ViewPatientModal";
import CancelAppointmentModal from "../modals/CancelAppointmentModal";

export default function TodayAppointments({ data }) {
  const { loading, error, cancelAppointment, getAllAppointments } =
    useAppointments();

  const { addQueue, loading: loadingQueues, error: errorQueues, addQueueError } = useQueues();

  const [queueSuccessOpen, setQueueSuccessOpen] = useState(false);
  const [queueErrorOpen, setQueueErrorOpen] = useState(false);
const [queueErrorMessage, setQueueErrorMessage] = useState("");



  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const refreshAppointments = () => {
    const doctorId = localStorage.getItem("selectedDoctorId");
    const clinicId = localStorage.getItem("selectedClinicId");

    if (doctorId && clinicId) {
      getAllAppointments(Number(doctorId), Number(clinicId));
    }
  };

  const handleCancelConfirm = async (reason) => {
    await cancelAppointment(selectedAppointment.appointment_id, reason);
    refreshAppointments();
    setShowCancel(false);
    setSelectedAppointment(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-sm text-gray-500">Loading today’s appointments…</p>
      </div>
    );
  }

const handleAddToQueue = async (payload) => {
  const queueData = {
    patientId: payload.patient_id,
    doctorId: payload.doctor_id,
    clinicId: payload.clinic_id,
    priorityId: payload.priority_id,
    status: "waiting",
  };

  const success = await addQueue(queueData);

  if (success) {
    setQueueSuccessOpen(true);
  } else {
    setQueueErrorMessage(addQueueError || "Unable to add to queue.");
    setQueueErrorOpen(true);
  }
};


  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-blue-700 font-semibold mb-3">
          Today’s Appointments
        </h3>
        <p className="text-sm text-gray-500">
          No appointments scheduled for today.
        </p>
      </div>
    );
  }

return (
  <div className="bg-white rounded-lg shadow p-4 mb-6">
    {/* MODALS */}
    <ViewPatientModal
      isOpen={showView}
      appointment={selectedAppointment}
      onClose={() => {
        setShowView(false);
        setSelectedAppointment(null);
      }}
    />

    <CancelAppointmentModal
      isOpen={showCancel}
      appointment={selectedAppointment}
      onClose={() => {
        setShowCancel(false);
        setSelectedAppointment(null);
      }}
      onConfirm={handleCancelConfirm}
    />

    <h3 className="text-blue-700 font-semibold mb-3">
      Today’s Appointments
    </h3>

    {/* Scrollable Table */}
    <div className="w-full overflow-x-auto overflow-y-auto max-h-[500px]">
      <table className="min-w-[1100px] w-full border text-sm">
        <thead className="bg-blue-600 text-white sticky top-0 z-10">
          <tr>
            <th className="p-2 text-left whitespace-nowrap">Patient</th>
            <th className="p-2 text-left whitespace-nowrap">Date</th>
            <th className="p-2 text-left whitespace-nowrap">Type</th>
            <th className="p-2 text-left whitespace-nowrap">Priority</th>
            <th className="p-2 text-left whitespace-nowrap">Status</th>
            <th className="p-2 text-left whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr
              key={a.appointment_id}
              className="border-t hover:bg-blue-50"
            >
              <td className="p-2 whitespace-nowrap">
                {`${a.patient_f_name} ${a.patient_m_name || ""} ${
                  a.patient_l_name
                }`}
              </td>

              <td className="p-2 whitespace-nowrap">
                {a.appointment_date}
              </td>

              <td className="p-2 whitespace-nowrap">
                {a.appointment_type}
              </td>

              <td className="p-2 whitespace-nowrap">
                {a.priority_type}
              </td>

              <td className="p-2 whitespace-nowrap">
                <StatusBadge status={a.status} />
              </td>

              <td className="p-2 whitespace-nowrap">
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => handleAddToQueue(a)}
                  >
                    Add to Queue
                  </button>

                  <button
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    onClick={() => {
                      setSelectedAppointment(a);
                      setShowView(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                    onClick={() => {
                      setSelectedAppointment(a);
                      setShowCancel(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
