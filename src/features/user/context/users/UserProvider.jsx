import { useState } from "react";
import { UserContext } from "./UserContext.jsx";
import {
  loginUser,
  registerUser,
  updateUserSettingsApi,
  getPersonalInfoApi,
} from "../../api/userApi.js";

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // LOGIN
  // -------------------------
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const res = await loginUser(email, password);

    if (!res?.ok) {
      setError(res?.message || "Login failed");
      setLoading(false);
      return res;
    }

    // store token + user
    localStorage.setItem("user_token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // load full profile
    await refreshUser();

    setLoading(false);
    return res;
  };

  // -------------------------
  // REGISTER
  // -------------------------
  const register = async (payload) => {
    setLoading(true);
    setError(null);

    const res = await registerUser(payload);

    if (!res?.ok) {
      setError(res?.message || "Registration failed");
      setLoading(false);
      return res;
    }

    setLoading(false);
    return res;
  };

  // -------------------------
  // GET PERSONAL INFO
  // -------------------------
  const getPersonalInfo = async () => {
    setLoading(true);
    setError(null);

    const res = await getPersonalInfoApi();

    if (!res?.ok) {
      setError(res?.message || "Failed to load profile");
      setLoading(false);
      return res;
    }

    setUserInfo(res.data.userInfo);
    setLoading(false);
    return res;
  };

  // -------------------------
  // UPDATE SETTINGS (password / image)
  // -------------------------
  const updateSettings = async (payload) => {
    setLoading(true);
    setError(null);

    console.log(payload);
    const res = await updateUserSettingsApi(payload);

    if (!res?.success) {
      setError(res?.error || "Failed to update settings");
      setLoading(false);
      return res;
    }

    // 🔁 HARD REFRESH USER STATE
    // await refreshUser();

    setLoading(false);
    return res;
  };

  // -------------------------
  // REFRESH USER (SAFE)
  // -------------------------
  const refreshUser = async () => {
    const res = await getPersonalInfoApi();
    if (!res.ok) return;

    const user = res.data.userInfo;

    setUserInfo({
      ...user,
      profileImgUrl: user.profileImgUrl
        ? `${user.profileImgUrl}?t=${Date.now()}`
        : null,
    });
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const clearUser = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    setUserInfo(null);
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        loading,
        error,

        // auth
        login,
        register,
        clearUser,

        // profile
        getPersonalInfo,
        refreshUser,
        updateSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
