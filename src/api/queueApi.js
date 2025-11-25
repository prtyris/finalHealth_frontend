const API_BASE = import.meta.env.VITE_API_BASE;

export const addToQueue = async (payload) => {
  try {
    const token = localStorage.getItem("user_token"); // or admin_token / user_token depending on your auth flow

    const res = await fetch(`${API_BASE}/api/queue-routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("❌ addToQueue error:", err.message);
    return { error: "Network error" };
  }
};

const getToken = () => localStorage.getItem("user_token");

export const getQueue = async (doctorId, clinicId) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/queue-routes/doctor/${doctorId}/clinic/${clinicId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return await res.json();
  } catch (err) {
    console.error("❌ getQueue error:", err.message);
    return { error: "Network error" };
  }
};

export const updateQueueStatus = async (queueEntryId, status) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/queue-routes/${queueEntryId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ updateQueueStatus error:", err.message);
    return { error: "Network error" };
  }
};
