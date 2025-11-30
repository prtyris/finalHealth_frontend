const API_BASE = import.meta.env.VITE_API_BASE;

// Helper function to get the token
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};

export const getMedicalHistory = async (patientId) => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(`${API_BASE}/api/medical-records/${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    return await res.json(); // Return the response JSON from the API
  } catch (err) {
    console.error("❌ Error fetching medical history:", err.message);
    return { error: "Network error" };
  }
};

export const addMedicalRecord = async (patientId, recordData) => {
  try {
    const token = getAuthToken(); // Assuming you have a token stored

    // Create JSON object instead of FormData since we're not handling files anymore
    const response = await fetch(
      `${API_BASE}/api/medical-records/${patientId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(recordData), // Send the text-based data
      }
    );

    const result = await response.json();
    return result; // Handle success or error from backend
  } catch (err) {
    console.error("Error saving medical record:", err);
    return { success: false, error: err.message };
  }
};

// Update an existing medical record
// Update an existing medical record
export const updateMedicalRecord = async (recordId, recordData) => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(`${API_BASE}/api/medical-records/${recordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify(recordData), // Send the updated medical record data
    });

    return await res.json(); // Return the response JSON from the API
  } catch (err) {
    console.error("❌ Error updating medical record:", err.message);
    return { error: "Network error" };
  }
};
