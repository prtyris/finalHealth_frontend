import StatusBadge from "./StatusBadge";
import { useState } from "react";

import ViewPatientModal from "../modals/ViewPatientModal";
import RescheduleAppointmentModal from "../modals/RescheduleAppointmentModal";
import CancelAppointmentModal from "../modals/CancelAppointmentModal";

import { useAppointments } from "../../../context/appointments/useAppointments";

export default function AllAppointments({ data }) {
  const { rescheduleAppointment, getAllAppointments, cancelAppointment } =
    useAppointments();

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const handleRescheduleConfirm = async (date, type) => {
    const doctorId = localStorage.getItem("selectedDoctorId");
    const clinicId = localStorage.getItem("selectedClinicId");

    await rescheduleAppointment(
      selectedAppointment.appointment_id,
      date,
      type,
      doctorId,
      clinicId,
    );

    setRescheduleOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelConfirm = async (reason) => {
    await cancelAppointment(selectedAppointment.appointment_id, reason);

    const doctorId = localStorage.getItem("selectedDoctorId");
    const clinicId = localStorage.getItem("selectedClinicId");

    if (doctorId && clinicId) {
      getAllAppointments(Number(doctorId), Number(clinicId));
    }

    setCancelOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* MODALS */}
      <ViewPatientModal
        isOpen={showModal}
        appointment={selectedAppointment}
        onClose={() => {
          setShowModal(false);
          setSelectedAppointment(null);
        }}
      />

      <RescheduleAppointmentModal
        isOpen={rescheduleOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setRescheduleOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleRescheduleConfirm}
      />

      <CancelAppointmentModal
        isOpen={cancelOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setCancelOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleCancelConfirm}
      />

      <h3 className="text-blue-700 font-semibold mb-3">All Appointments</h3>

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left whitespace-nowrap">Patient</th>
              <th className="p-2 text-left whitespace-nowrap">Doctor</th>
              <th className="p-2 text-left whitespace-nowrap">Clinic</th>
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
                className="border-t text-black hover:bg-blue-50"
              >
                <td className="p-2 whitespace-nowrap">
                  {`${a.patient_f_name} ${a.patient_m_name} ${a.patient_l_name}`}
                </td>
                <td className="p-2 whitespace-nowrap">{a.doctor_name}</td>
                <td className="p-2 whitespace-nowrap">{a.clinic_name}</td>
                <td className="p-2 whitespace-nowrap">{a.appointment_date}</td>
                <td className="p-2 whitespace-nowrap">{a.appointment_type}</td>
                <td className="p-2 whitespace-nowrap">{a.priority_type}</td>
                <td className="p-2 whitespace-nowrap">
                  <StatusBadge status={a.status} />
                </td>

                {/* ACTIONS */}
                <td className="p-2 whitespace-nowrap">
                  <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <button
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      onClick={() => {
                        setSelectedAppointment(a);
                        setShowModal(true);
                      }}
                    >
                      View
                    </button>

                    <button
                      className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                      onClick={() => {
                        setSelectedAppointment(a);
                        setRescheduleOpen(true);
                      }}
                    >
                      Reschedule
                    </button>

                    <button
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                      onClick={() => {
                        setSelectedAppointment(a);
                        setCancelOpen(true);
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
