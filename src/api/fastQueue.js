const API_BASE = import.meta.env.VITE_API_BASE;

// Helper function to get the token
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust based on your token storage
};

// ---------------------------
// AUTH HEADERS
// ---------------------------
function authHeaders() {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Adding the token here
  };
}

// Update Queue Status (In Progress, Complete, etc.)
export const updateQueueStatus = async (queueEntryId, newStatus) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/queue-routes/${queueEntryId}/status`, // Corrected endpoint
      {
        method: "PUT",
        headers: authHeaders(), // Adding Authorization header
        body: JSON.stringify({
          status: newStatus, // Send the new status (e.g., "In Progress" or "Completed")
        }),
      }
    );

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.message || "Failed to update queue status");
    }

    return await res.json(); // Return the successful response
  } catch (err) {
    console.error("❌ updateQueueStatus error:", err.message);
    return { error: err.message || "Network error" }; // Return the error message if something goes wrong
  }
};
