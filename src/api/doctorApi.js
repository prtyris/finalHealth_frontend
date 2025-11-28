const API_BASE = import.meta.env.VITE_API_BASE;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };
}

export const registerDoctor = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/api/doctor-routes`, {
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
    console.log(err);
  }
};

// Get all doctors
export const getDoctors = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/doctor-routes/doctors`);
    return await res.json();
  } catch (err) {
    console.error("❌ getDoctors error:", err.message);
    return { error: "Network error" };
  }
};

// Get clinics assigned to a doctor
export const getClinicsOfDoctor = async (doctorId) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/doctor-routes/doctors/${doctorId}/clinics`
    );
    return await res.json();
  } catch (err) {
    console.error("❌ getClinicsOfDoctor error:", err.message);
    return { error: "Network error" };
  }
};
