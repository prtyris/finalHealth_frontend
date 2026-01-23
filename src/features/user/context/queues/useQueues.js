import { useContext } from "react";
import { QueueContext } from "./QueueContext";

export const useQueues = () => {
  const ctx = useContext(QueueContext);

  if (!ctx) {
    throw new Error("useQueues must be used inside QueueProvider");
  }

  return ctx;
};
