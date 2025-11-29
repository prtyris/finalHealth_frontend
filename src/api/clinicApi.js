const API_BASE = import.meta.env.VITE_API_BASE;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };
}

export const registerClinic = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/api/clinic-routes/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Doctor registration failed");
    }

    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

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

export const getUnassignedClinics = async (doctorId) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/clinic-routes/unassigned/${doctorId}`,
      {
        method: "GET",
        headers: authHeaders(),
      }
    );
    console.log(res);
    return await res.json();
  } catch (err) {
    console.error("getUnassignedClinics error:", err);
    return { success: false, error: "Network error" };
  }
};
