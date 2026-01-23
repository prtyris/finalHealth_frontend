import { useContext } from "react";
import { PatientContext } from "./PatientContext";

export const usePatients = () => {
  const ctx = useContext(PatientContext);

  if (!ctx) {
    throw new Error("usePatients must be used inside PatientProvider");
  }

  return ctx;
};
