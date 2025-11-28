const API_BASE = import.meta.env.VITE_API_BASE;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };
}

export const getAllClinics = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/clinic-routes/all-clinics`, {
      method: "GET",
      headers: authHeaders(),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ getDoctors error:", err.message);
    return { error: "Network error" };
  }
};
