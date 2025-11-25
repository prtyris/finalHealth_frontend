import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import AddAppointmentModal from "./modals/AddAppointmentModal";
import EditAppointmentModal from "./modals/EditAppointmentModal";
import ViewAppointmentModal from "./modals/ViewAppointmentModal";
import RescheduleModal from "./modals/RescheduleModal";
import MedicalRecordModal from "./modals/MedicalRecordModal";
import SuccessModal from "./modals/SuccessModal"; // We'll create this new modal

import { getDoctors, getClinicsOfDoctor } from "../../../../api/doctorApi";
import {
  getTodayAppointments,
  getAllAppointments,
  completeAppointment as apiCompleteAppointment,
  cancelAppointment,
  // confirmAppointment as apiConfirmAppointment, // backend not ready yet
} from "../../../../api/appointmentApi";
import { addToQueue, getQueue } from "../../../../api/queueApi";

const Appointments = () => {
  const [modals, setModals] = useState({
    addAppointment: true,
    editAppointment: false,
    viewAppointment: false,
    reschedule: false,
    medicalRecord: false,
  });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [clinics, setClinics] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [queueNormal, setQueueNormal] = useState([]);
  const [queuePriority, setQueuePriority] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Loading states
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingClinics, setLoadingClinics] = useState(false);
  const [loadingToday, setLoadingToday] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [queueActionLoading, setQueueActionLoading] = useState(false);

  const handleCancelAppointment = async (appointment) => {
    if (!appointment?.appointmentId || actionLoading) return;
    setActionLoading(true);

    const res = await cancelAppointment(appointment.appointmentId);

    if (res?.success) {
      // Refresh appointments list after cancellation
      await fetchAllAppointments(selectedDoctorId, selectedClinicId);
    } else {
      console.error("Cancel appointment failed:", res?.error);
    }

    setActionLoading(false);
  };

  const onRescheduleSuccess = () => {
    setShowSuccessModal(true); // Show success modal after reschedule
    fetchAllAppointments(selectedDoctorId, selectedClinicId); // Re-fetch all appointments
  };

  const handleConfirmSuccess = () => {
    setShowSuccessModal(false); // Close success modal
    // Optionally refresh or perform other actions
  };

  const openModal = (modalName, appointment = null) => {
    setSelectedAppointment(appointment);
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
    setSelectedAppointment(null);
  };

  // =============================
  // API: Load Doctors on mount
  // =============================
  useEffect(() => {
    const loadDoctors = async () => {
      setLoadingDoctors(true);
      const res = await getDoctors();
      if (res?.success) {
        setDoctors(res.doctors || []);
      } else {
        console.error("Failed to load doctors:", res?.error);
      }
      setLoadingDoctors(false);
    };

    loadDoctors();
  }, []);

  // =============================
  // API: Load Clinics when doctor changes
  // =============================
  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);
    setSelectedClinicId("");
    setClinics([]);
    setTodayAppointments([]);
    setAllAppointments([]);
    setQueueNormal([]);
    setQueuePriority([]);

    if (!doctorId) return;

    setLoadingClinics(true);
    const res = await getClinicsOfDoctor(doctorId);
    if (res?.success) {
      setClinics(res.clinics || []);
    } else {
      console.error("Failed to load clinics:", res?.error);
    }
    setLoadingClinics(false);
  };

  // =============================
  // API: Load appointments & queue when clinic changes
  // =============================
  const handleClinicChange = async (e) => {
    const clinicId = e.target.value;
    setSelectedClinicId(clinicId);

    setTodayAppointments([]);
    setAllAppointments([]);
    setQueueNormal([]);
    setQueuePriority([]);

    if (!selectedDoctorId || !clinicId) return;

    await Promise.all([
      fetchTodayAppointments(selectedDoctorId, clinicId),
      fetchAllAppointments(selectedDoctorId, clinicId),
      fetchQueue(selectedDoctorId, clinicId),
    ]);
  };

  const fetchTodayAppointments = async (doctorId, clinicId) => {
    setLoadingToday(true);
    const res = await getTodayAppointments(doctorId, clinicId);
    if (res?.success) {
      setTodayAppointments(res.appointments || []);
    } else {
      console.error("Failed to load today appointments:", res?.error);
      setTodayAppointments([]);
    }
    setLoadingToday(false);
  };

  const fetchAllAppointments = async (doctorId, clinicId) => {
    setLoadingAll(true);
    const res = await getAllAppointments(doctorId, clinicId);
    if (res?.success) {
      setAllAppointments(res.appointments || []);
    } else {
      console.error("Failed to load all appointments:", res?.error);
      setAllAppointments([]);
    }
    setLoadingAll(false);
  };

  const fetchQueue = async (doctorId, clinicId) => {
    setLoadingQueue(true);
    const res = await getQueue(doctorId, clinicId);
    if (res?.success) {
      const q = res.queue || [];

      // Try to use priority level if backend joins it; fallback to all in priority
      const normal = q.filter(
        (entry) =>
          entry.priorityLevel === "Normal" || entry.priority_level === "Normal"
      );
      const priority = q.filter(
        (entry) =>
          !(
            entry.priorityLevel === "Normal" ||
            entry.priority_level === "Normal"
          )
      );

      setQueueNormal(normal);
      setQueuePriority(priority.length ? priority : q); // if nothing classified, show all as priority
    } else {
      console.error("Failed to load queue:", res?.error);
      setQueueNormal([]);
      setQueuePriority([]);
    }
    setLoadingQueue(false);
  };

  const handleConfirmAppointmentLocal = (appointment) => {
    // backend confirm endpoint not yet defined; update UI only
    if (!appointment?.appointmentId) return;
    setTodayAppointments((prev) =>
      prev.map((apt) =>
        apt.appointmentId === appointment.appointmentId
          ? { ...apt, status: "Confirmed" }
          : apt
      )
    );
  };

  // =============================
  // Actions: Add to Queue
  // =============================
  const handleAddToQueue = async (appointment) => {
    if (queueActionLoading) return;
    if (
      !appointment?.patientId ||
      !appointment?.doctorId ||
      !appointment?.clinicId ||
      !appointment?.priorityId
    ) {
      console.error("Missing appointment fields required for queueing");
      return;
    }

    setQueueActionLoading(true);
    const payload = {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      clinicId: appointment.clinicId,
      priorityId: appointment.priorityId,
      status: "Waiting",
    };

    const res = await addToQueue(payload);
    if (res?.success) {
      if (selectedDoctorId && selectedClinicId) {
        await fetchQueue(selectedDoctorId, selectedClinicId);
      }
    } else {
      console.error("Add to queue failed:", res?.error);
    }
    setQueueActionLoading(false);
  };

  // =============================
  // Filtering (search + status) for appointments
  // =============================
  const filteredAppointments = (list) => {
    return list.filter((apt) => {
      const matchesSearch =
        !searchTerm ||
        (apt.patientName || apt.patient_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const status = (apt.status || "").toLowerCase();
      const matchesStatus =
        statusFilter === "all" || status === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    const statusClasses = {
      scheduled: "bg-blue-100 text-blue-800",
      confirmed: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const statusText = {
      scheduled: "Scheduled",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[s] || "bg-gray-100 text-gray-700"
        }`}
      >
        {statusText[s] || status}
      </span>
    );
  };

  const isSelectionReady = selectedDoctorId && selectedClinicId;

  // =============================
  // UI
  // =============================
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50  p-4 md:p-6">
        {/* =============================
        HEADER + NAV TABS
    ============================== */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Appointments & Queue Management
            </h2>

            {/* TABS */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === "appointments"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                Appointments
              </button>

              <button
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === "queue-normal"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
                onClick={() => setActiveTab("queue-normal")}
              >
                Queue – Normal
              </button>

              <button
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === "queue-priority"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
                onClick={() => setActiveTab("queue-priority")}
              >
                Queue – Priority
              </button>
            </div>
          </div>

          {/* =============================
          FILTER BAR — RESPONSIVE
      ============================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Doctor */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
              value={selectedDoctorId}
              onChange={handleDoctorChange}
              disabled={loadingDoctors}
            >
              <option value="">
                {loadingDoctors ? "Loading doctors..." : "Select Doctor"}
              </option>
              {doctors.map((doc) => (
                <option key={doc.doctorId} value={doc.doctorId}>
                  {`${doc.fName} ${doc.lName}`}
                </option>
              ))}
            </select>

            {/* Clinic */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
              value={selectedClinicId}
              onChange={handleClinicChange}
              disabled={!selectedDoctorId || loadingClinics}
            >
              <option value="">
                {!selectedDoctorId
                  ? "Select doctor first"
                  : loadingClinics
                  ? "Loading clinics..."
                  : "Select Clinic"}
              </option>
              {clinics.map((clinic) => (
                <option
                  key={clinic.clinic_id || clinic.clinicId}
                  value={clinic.clinic_id || clinic.clinicId}
                >
                  {clinic.clinic_name || clinic.clinicName}
                </option>
              ))}
            </select>

            {/* Search */}
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={activeTab !== "appointments"}
            />

            {/* Status */}
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              disabled={activeTab !== "appointments"}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Add Appointment */}
            <Link to={"/user/appointments/create"}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full">
                + Add Appointment
              </button>
            </Link>
          </div>
        </div>

        {/* =============================
        TABS BELOW THIS POINT
    ============================== */}

        {/* =============================
    TAB: APPOINTMENTS
============================== */}
        {activeTab === "appointments" && (
          <>
            {/* TODAY */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Appointments
              </h3>

              {!isSelectionReady ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a doctor and clinic to view today's appointments.
                </p>
              ) : loadingToday ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading today's appointments...
                </p>
              ) : todayAppointments.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No appointments scheduled for today.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Patient
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {filteredAppointments(todayAppointments).map((apt) => (
                        <tr
                          key={apt.appointmentId}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {apt.patientName || apt.patient_name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {new Date(apt.appointmentDate).toLocaleDateString(
                              "en-PH",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {apt.appointmentType}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {getStatusBadge(apt.status)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs"
                                onClick={() =>
                                  openModal("viewAppointment", apt)
                                }
                              >
                                View
                              </button>

                              {/* Add to Queue */}
                              <button
                                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded text-xs"
                                onClick={() => handleAddToQueue(apt)}
                                disabled={queueActionLoading}
                              >
                                {queueActionLoading
                                  ? "Queueing..."
                                  : "Add to Queue"}
                              </button>

                              {apt.status?.toLowerCase() === "scheduled" && (
                                <>
                                  <button
                                    className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded text-xs"
                                    onClick={() =>
                                      handleConfirmAppointmentLocal(apt)
                                    }
                                    disabled={actionLoading}
                                  >
                                    Confirm
                                  </button>
                                </>
                              )}

                              {apt.status?.toLowerCase() === "completed" && (
                                <button
                                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs"
                                  onClick={() =>
                                    openModal("medicalRecord", apt)
                                  }
                                >
                                  Record
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ALL APPOINTMENTS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                All Appointments
              </h3>

              {!isSelectionReady ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a doctor and clinic to view all appointments.
                </p>
              ) : loadingAll ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading all appointments...
                </p>
              ) : allAppointments.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No appointments found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Patient
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {filteredAppointments(allAppointments).map((apt) => (
                        <tr
                          key={apt.appointmentId}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {apt.patientName || apt.patient_name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {new Date(apt.appointmentDate).toLocaleDateString(
                              "en-PH",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {apt.appointmentType}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {getStatusBadge(apt.status)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex flex-wrap gap-2">
                              <button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs"
                                onClick={() =>
                                  openModal("viewAppointment", apt)
                                }
                              >
                                View
                              </button>

                              <button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs"
                                onClick={() => openModal("reschedule", apt)}
                              >
                                Reschedule
                              </button>
                              <button
                                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                                onClick={() => handleCancelAppointment(apt)}
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
              )}
            </div>
          </>
        )}

        {/* =====================================
        TAB: QUEUE – NORMAL
    ====================================== */}
        {activeTab === "queue-normal" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Queue – Normal Patients
            </h3>

            {!isSelectionReady ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select a doctor and clinic first.
              </p>
            ) : loadingQueue ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading queue...
              </p>
            ) : queueNormal.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No normal patients in queue.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Arrival Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {queueNormal.map((entry) => (
                      <tr
                        key={entry.queueEntryId}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.patientName || `Patient #${entry.patientId}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.arrivalTime
                            ? new Date(entry.arrivalTime).toLocaleTimeString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =====================================
        TAB: QUEUE – PRIORITY
    ====================================== */}
        {activeTab === "queue-priority" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Queue – Priority Patients (PWD, Senior, Emergency, Follow-up)
            </h3>

            {!isSelectionReady ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select a doctor and clinic first.
              </p>
            ) : loadingQueue ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading queue...
              </p>
            ) : queuePriority.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No priority patients in queue.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px]">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Arrival Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {queuePriority.map((entry) => (
                      <tr
                        key={entry.queueEntryId}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.patientName || `Patient #${entry.patientId}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.priorityLevel ||
                            entry.priority_level ||
                            "Priority"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.arrivalTime
                            ? new Date(entry.arrivalTime).toLocaleTimeString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {entry.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =====================================
        MODALS
    ====================================== */}
        <AddAppointmentModal
          isOpen={modals.addAppointment}
          onClose={() => closeModal("addAppointment")}
        />
        <EditAppointmentModal
          isOpen={modals.editAppointment}
          onClose={() => closeModal("editAppointment")}
          appointment={selectedAppointment}
        />
        <ViewAppointmentModal
          isOpen={modals.viewAppointment}
          onClose={() => closeModal("viewAppointment")}
          appointment={selectedAppointment}
        />

        {/* Reschedule Modal */}
        <RescheduleModal
          isOpen={modals.reschedule}
          onClose={() => closeModal("reschedule")}
          appointment={selectedAppointment}
          onRescheduleSuccess={onRescheduleSuccess}
        />

        {/* Success Modal */}
        {showSuccessModal && <SuccessModal onClose={handleConfirmSuccess} />}
        <MedicalRecordModal
          isOpen={modals.medicalRecord}
          onClose={() => closeModal("medicalRecord")}
          appointment={selectedAppointment}
        />
      </div>
    </Layout>
  );
};

export default Appointments;
