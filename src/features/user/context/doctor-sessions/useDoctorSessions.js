import { useContext } from "react";
import { DoctorSessionContext } from "./DoctorSessionContext";

export const useDoctorSessions = () => {
  const ctx = useContext(DoctorSessionContext);

  if (!ctx) {
    throw new Error(
      "useDoctorSessions must be used inside DoctorSessionProvider"
    );
  }

  return ctx;
};
