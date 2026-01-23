import { useState } from "react";
import { DoctorSessionContext } from "./DoctorSessionContext.jsx";
import {
  getDoctorScheduleInClinicApi,
  getAllDoctorSessionsApi,
  createDoctorSessionApi,
  deleteSessionApi,
} from "../../api/doctorSessionApi.js";

export const DoctorSessionProvider = ({ children }) => {
  const [doctorSessions, setDoctorSessions] = useState([]);
  const [allDoctorSessions, setAllDoctorSessions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createDoctorSessionLoading, setCreateDoctorSessionLoading] =
    useState(false);
  const [deleteSessionLoading, setDeleteSessionLoading] = useState(false);

  const getDoctorScheduleInClinic = async (doctorId, clinicId) => {
    setLoading(true);
    setError(null);

    const res = await getDoctorScheduleInClinicApi(doctorId, clinicId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setDoctorSessions(res.data.sessions || []);
    setLoading(false);
  };

  const getAllDoctorSessions = async (doctorId) => {
    setLoading(true);
    setError(null);

    const res = await getAllDoctorSessionsApi(doctorId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setAllDoctorSessions(res.data.sessions || []);
    setLoading(false);
  };

  const createDoctorSession = async (doctorId, clinicId) => {
    setCreateDoctorSessionLoading(true);
    setError(null);

    const res = await createDoctorSessionApi(doctorId, clinicId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setCreateDoctorSessionLoading(false);
  };

  const deleteSession = async (sessionId) => {
    setDeleteSessionLoading(true);
    setError(null);

    const res = await deleteSessionApi(sessionId);

    if (!res.ok) {
      setError(res.message);
      setDeleteSessionLoading(false);
      return;
    }

    setDeleteSessionLoading(false);
  };

  return (
    <DoctorSessionContext.Provider
      value={{
        doctorSessions,
        allDoctorSessions,
        loading,
        createDoctorSessionLoading,
        error,
        getDoctorScheduleInClinic,
        getAllDoctorSessions,
        createDoctorSession,
        deleteSession,
      }}
    >
      {children}
    </DoctorSessionContext.Provider>
  );
};
