import { useContext } from "react";
import { DoctorContext } from "./DoctorContext";

export const useDoctors = () => {
  const ctx = useContext(DoctorContext);

  if (!ctx) {
    throw new Error("useDoctors must be used inside DoctorsProvider");
  }

  return ctx;
};
