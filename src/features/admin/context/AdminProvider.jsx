import { useState } from "react";
import { AdminContext } from "./AdminContext.jsx";
import { getAllSubscribersApi } from "../api/adminApi.js";

export const AdminProvider = ({ children }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllSubscribers = async () => {
    setLoading(true);
    setError(null);

    const res = await getAllSubscribersApi();

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }

    setSubscribers(res.data.subscribers || []);
    setLoading(false);
  };

  const clearSubscribers = () => {
    setSubscribers([]);
  };

  return (
    <AdminContext.Provider
      value={{
        subscribers,
        loading,
        error,
        getAllSubscribers,
        clearSubscribers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
