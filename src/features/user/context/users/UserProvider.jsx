import { useState } from "react";
import { UserContext } from "./UserContext.jsx";
import { getPersonalInfoApi } from "../../api/userApi.js";

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPersonalInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getPersonalInfoApi();

      if (!res.ok) {
        setError(res.message);
        setLoading(false);
        return;
      }

      setUserInfo(res.data.userInfo);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        loading,
        error,
        getPersonalInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
