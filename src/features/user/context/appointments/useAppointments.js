import { useContext } from "react";
import { AppointmentContext } from "./AppointmentContext";

export const useAppointments = () => {
  const ctx = useContext(AppointmentContext);

  if (!ctx) {
    throw new Error("useAppointments must be used inside AppointmentProvider");
  }

  return ctx;
};
