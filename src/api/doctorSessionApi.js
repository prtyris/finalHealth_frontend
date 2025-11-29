const API_BASE = import.meta.env.VITE_API_BASE;

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
  };
}

export const addDoctorSession = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/api/doctor-session-routes/`, {
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

export async function getDoctorSessions(doctorId) {
  try {
    const res = await fetch(
      `${API_BASE}/api/doctor-session-routes/doctor/${doctorId}`,
      {
        method: "GET",
        headers: authHeaders(),
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch doctor sessions:", err);
    return { success: false, sessions: [] };
  }
}
