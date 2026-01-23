import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Tabs from "./components/Tabs";
import HeaderFilters from "./components/HeaderFilter.jsx";

import TodayAppointments from "./components/TodayAppointments.jsx";
import AllAppointments from "./components/AllAppointments.jsx";
import QueueNormal from "./components/QueueNormal.jsx";
import QueuePriority from "./components/QueuePriority.jsx";

import { useAppointments } from "../../context/appointments/useAppointments.js";
import { useQueues } from "../../context/queues/useQueues.js";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("appointments");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const {
    allAppointments,
    todayAppointments,
    getAllAppointments,
    clearAppointments,
    loading: appointmentLoading,
  } = useAppointments();

  const {
    normalQueues,
    priorityQueues,
    getQueueOfDoctorInClinic,
    loading: queueLoading,
  } = useQueues();

  const syncFromStorage = () => {
    const doctorId = localStorage.getItem("selectedDoctorId");
    const clinicId = localStorage.getItem("selectedClinicId");

    if (doctorId && clinicId) {
      getAllAppointments(Number(doctorId), Number(clinicId));
      getQueueOfDoctorInClinic(Number(doctorId), Number(clinicId));
    } else {
      clearAppointments();
    }
  };

  useEffect(() => {
    syncFromStorage();
    window.addEventListener("appointments:selectionChanged", syncFromStorage);

    return () =>
      window.removeEventListener(
        "appointments:selectionChanged",
        syncFromStorage
      );
  }, []);

  const filteredAllAppointments = allAppointments.filter((a) => {
    const keyword = search.toLowerCase();

    return (
      a.patient_f_name.toLowerCase().includes(keyword) ||
      a.patient_l_name.toLowerCase().includes(keyword) ||
      a.doctor_name.toLowerCase().includes(keyword) ||
      a.clinic_name.toLowerCase().includes(keyword)
    );
  });

  const filteredTodayAppointments = todayAppointments.filter((a) => {
    const keyword = search.toLowerCase();

    return (
      a.patient_f_name.toLowerCase().includes(keyword) ||
      a.patient_l_name.toLowerCase().includes(keyword) ||
      a.doctor_name.toLowerCase().includes(keyword) ||
      a.clinic_name.toLowerCase().includes(keyword)
    );
  });

  const filteredNormalQueues = normalQueues.filter((q) => {
    if (!search) return true;

    const keyword = search.toLowerCase();

    return (
      q.patientName?.toLowerCase().includes(keyword) ||
      q.status?.toLowerCase().includes(keyword) ||
      q.priorityLevel?.toLowerCase().includes(keyword)
    );
  });

  const filteredPriorityQueues = priorityQueues.filter((q) => {
    if (!search) return true;

    const keyword = search.toLowerCase();

    return (
      q.patientName?.toLowerCase().includes(keyword) ||
      q.status?.toLowerCase().includes(keyword) ||
      q.priorityLevel?.toLowerCase().includes(keyword)
    );
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <HeaderFilters search={search} onSearchChange={setSearch} />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "appointments" && (
          <>
            <TodayAppointments data={filteredTodayAppointments} />
            <AllAppointments data={filteredAllAppointments} />
          </>
        )}

        {activeTab === "queue-normal" && (
          <QueueNormal data={filteredNormalQueues} loading={queueLoading} />
        )}

        {activeTab === "queue-priority" && (
          <QueuePriority data={filteredPriorityQueues} loading={queueLoading} />
        )}
      </div>
    </Layout>
  );
}
