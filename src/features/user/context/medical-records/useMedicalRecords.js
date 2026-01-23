import { useContext } from "react";
import { MedicalRecordsContext } from "./MedicalRecordsContext";

export const useMedicalRecords = () => {
  const ctx = useContext(MedicalRecordsContext);

  if (!ctx) {
    throw new Error(
      "useMedicalRecords must be used inside MedicalRecordsProvider"
    );
  }

  return ctx;
};
