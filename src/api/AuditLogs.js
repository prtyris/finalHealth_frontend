const API_BASE = import.meta.env.VITE_API_BASE;

const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};

export const getMyLogs = async () => {
  try {
    const token = getAuthToken();
    const res = await fetch(`${API_BASE}/api/audit/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("❌ audit logs error:", err.message);
    return { error: "Network error" };
  }
};
