import { useState } from "react";

import { useAppointments } from "../../../context/appointments/useAppointments";
import { useQueues } from "../../../context/queues/useQueues";

import StatusBadge from "./StatusBadge";

import ViewPatientModal from "../modals/ViewPatientModal";
import CancelAppointmentModal from "../modals/CancelAppointmentModal";

export default function TodayAppointments({ data }) {
  const { loading, error, cancelAppointment, getAllAppointments } =
    useAppointments();

  const { addQueue, loading: loadingQueues, error: errorQueues } = useQueues();

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
    console.table(payload);
    const queueData = {
      patientId: payload.patient_id,
      doctorId: payload.doctor_id,
      clinicId: payload.clinic_id,
      priorityId: payload.priority_id,
      status: "waiting",
    };

    console.table([queueData]);

    await addQueue(queueData);
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

      <h3 className="text-blue-700 font-semibold mb-3">Today’s Appointments</h3>

      <table className="w-full border text-sm">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Doctor</th>
            <th className="p-2 text-left">Clinic</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.appointment_id} className="border-t hover:bg-blue-50">
              <td className="p-2">
                {`${a.patient_f_name} ${a.patient_m_name || ""} ${
                  a.patient_l_name
                }`}
              </td>
              <td className="p-2">{a.doctor_name}</td>
              <td className="p-2">{a.clinic_name}</td>
              <td className="p-2">{a.appointment_date}</td>
              <td className="p-2">{a.appointment_type}</td>
              <td className="p-2">{a.priority_type}</td>
              <td className="p-2">
                <StatusBadge status={a.status} />
              </td>

              <td className="p-2">
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    onClick={() => handleAddToQueue(a)}
                  >
                    Add to Queue
                  </button>

                  <button
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                    onClick={() => {
                      setSelectedAppointment(a);
                      setShowView(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
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
  );
}
