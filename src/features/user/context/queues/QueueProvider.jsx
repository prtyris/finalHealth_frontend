import { useState } from "react";
import { QueueContext } from "./QueueContext.jsx";
import {
  getQueueOfDoctorInClinicApi,
  updateQueueStatusApi,
  addQueueApi,
} from "../../api/queueApi.js";

export const QueueProvider = ({ children }) => {
  const [normalQueues, setNormalQueues] = useState([]);
  const [priorityQueues, setPriorityQueues] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const [activeClinicId, setActiveClinicId] = useState(null);

  const getQueueOfDoctorInClinic = async (doctorId, clinicId) => {
    if (!doctorId || !clinicId) {
      // 🔥 RESET STATE
      setNormalQueues([]);
      setPriorityQueues([]);
      setActiveDoctorId(null);
      setActiveClinicId(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    setActiveDoctorId(doctorId);
    setActiveClinicId(clinicId);

    const res = await getQueueOfDoctorInClinicApi(doctorId, clinicId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setNormalQueues(res.data.normalQueue || []);
    setPriorityQueues(res.data.priorityQueue || []);
    setLoading(false);
  };

  const updateQueueStatus = async (queueEntryId, status) => {
    if (!activeDoctorId || !activeClinicId) return false;

    setLoading(true);
    setError(null);

    const res = await updateQueueStatusApi(queueEntryId, status);

    console.log(!res.ok);
    if (!res.ok) {
      console.log("inside the error");
      setError(res.message);
      setLoading(false);
      return;
    }
    await getQueueOfDoctorInClinic(activeDoctorId, activeClinicId);

    setLoading(false);
    return true;
  };

  const addQueue = async (queueData) => {
    setLoading(true);
    setError(null);

    const res = await addQueueApi(queueData);

    console.log(!res.ok);
    if (!res.ok) {
      console.log("inside the error");
      setError(res.message);
      setLoading(false);
      return;
    }
    await getQueueOfDoctorInClinic(activeDoctorId, activeClinicId);

    setLoading(false);
    return true;
  };

  const clearQueues = () => {
    setNormalQueues([]);
    setPriorityQueues([]);
    setActiveDoctorId(null);
    setActiveClinicId(null);
    setError(null);
  };

  return (
    <QueueContext.Provider
      value={{
        normalQueues,
        priorityQueues,
        loading,
        error,
        getQueueOfDoctorInClinic,
        updateQueueStatus,
        addQueue,
        clearQueues,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
