const API_BASE = import.meta.env.VITE_API_BASE;

// Helper function to get the token
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};

// Register a new patient
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

// Fetch all patients
export const getAllPatients = async () => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(`${API_BASE}/api/patient-routes/all-patient`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Error in fetching patients:", err.message);
    return { error: "Network error" };
  }
};
