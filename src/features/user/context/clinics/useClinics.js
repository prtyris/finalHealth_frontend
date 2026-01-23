import { useContext } from "react";
import { ClinicContext } from "./ClinicContext";

export const useClinics = () => {
  const ctx = useContext(ClinicContext);

  if (!ctx) {
    throw new Error("useClinics must be used inside ClinicProvider");
  }

  return ctx;
};
