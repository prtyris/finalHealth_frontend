import { useState } from "react";
import { AppointmentContext } from "./AppointmentContext";
import {
  getAllAppointmentsApi,
  rescheduleAppointmentApi,
  cancelAppointmentApi,
  craeteAppointmentApi,
} from "../../api/appointmentApi.js";

export const AppointmentProvider = ({ children }) => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllAppointments = async (doctorId, clinicId) => {
    setLoading(true);
    setError(null);

    const res = await getAllAppointmentsApi(doctorId, clinicId);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setAllAppointments(res.data.allAppointments || []);
    setTodayAppointments(res.data.todayAppointments || []);
    setLoading(false);
  };

  const rescheduleAppointment = async (
    appointmentId,
    appointmentDate,
    appointmentType,
    doctorId,
    clinicId
  ) => {
    setLoading(true);
    setError(null);

    const res = await rescheduleAppointmentApi(
      appointmentId,
      appointmentDate,
      appointmentType
    );

    console.log(!res.ok);
    if (!res.ok) {
      console.log("inside the error");
      setError(res.message);
      setLoading(false);
      return;
    }

    if (doctorId && clinicId) {
      getAllAppointments(Number(doctorId), Number(clinicId));
    }

    setLoading(false);
  };

  const cancelAppointment = async (appointmentId, reason) => {
    setLoading(true);
    setError(null);

    const res = await cancelAppointmentApi(appointmentId, reason);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const createAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);

    const res = await craeteAppointmentApi(appointmentData);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    // 🔥 REFRESH appointments immediately
    await getAllAppointments(
      appointmentData.doctorId,
      appointmentData.clinicId
    );

    setLoading(false);
  };

  const clearAppointments = () => {
    setAllAppointments([]);
    setTodayAppointments([]);
  };

  return (
    <AppointmentContext.Provider
      value={{
        allAppointments,
        todayAppointments,
        loading,
        error,
        getAllAppointments,
        clearAppointments,
        rescheduleAppointment,
        cancelAppointment,
        createAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
