// api/adminApi.js
const API_BASE = import.meta.env.VITE_API_BASE;

export const getAuthToken = () => localStorage.getItem("admin_token");

// Fetch all users
export const getAllAdminUsers = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });

    return await res.json();
  } catch (err) {
    console.error("Error loading admin users:", err);
    return { success: false, users: [] };
  }
};

// Deactivate a user
export const deactivateUser = async (name) => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/deactivate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ name }),
    });

    return await res.json();
  } catch (err) {
    console.error("Error deactivating:", err);
    return { success: false };
  }
};

export const getVerificationList = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/admin/verification-list`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return await res.json();
  } catch (err) {
    return { success: false, error: "Network error" };
  }
};
