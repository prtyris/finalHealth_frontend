const API_BASE = import.meta.env.VITE_API_BASE;
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};
export const registerPatient = async (patientData) => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(`${API_BASE}/api/patient-routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify(patientData), // Send patient data in request body
    });

    return await res.json(); // Return the response JSON from the API
  } catch (err) {
    console.error("❌ Error in registering patient:", err.message);
    return { error: "Network error" };
  }
};

// api/patientApi.js
export const getAllPatients = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/patient-routes`);
    return await res.json();
  } catch (err) {
    console.error("❌ Error in fetching patients:", err.message);
    return { error: "Network error" };
  }
};
