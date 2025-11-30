const API_BASE = import.meta.env.VITE_API_BASE;

// Helper function to get the token (this depends on how you're storing it in your app,
// for example in `localStorage` or `sessionStorage`)
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};

// Today's Appointments
export const getTodayAppointments = async (doctorId, clinicId) => {
  try {
    const token = getAuthToken();
    const res = await fetch(
      `${API_BASE}/api/appointment-routes/doctor/${doctorId}/clinic/${clinicId}/today`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adding the token here
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ getTodayAppointments error:", err.message);
    return { error: "Network error" };
  }
};

// All Appointments
export const getAllAppointments = async (doctorId, clinicId) => {
  try {
    const token = getAuthToken();
    const res = await fetch(
      `${API_BASE}/api/appointment-routes/doctor/${doctorId}/clinic/${clinicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adding the token here
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ getAllAppointments error:", err.message);
    return { error: "Network error" };
  }
};

// Reschedule Appointment
export const rescheduleAppointment = async (
  appointmentId,
  newDate,
  appointmentType
) => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(
      `${API_BASE}/api/appointment-routes/${appointmentId}/reschedule`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding the token here
        },
        body: JSON.stringify({
          appointmentDate: newDate, // Send the new date here
          appointmentType: appointmentType, // Send the type of the appointment
        }),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ rescheduleAppointment error:", err.message);
    return { error: "Network error" };
  }
};

// Complete Appointment
export const completeAppointment = async (appointmentId) => {
  try {
    const token = getAuthToken();
    const res = await fetch(
      `${API_BASE}/api/appointments-routes/${appointmentId}/complete`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Adding the token here
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ completeAppointment error:", err.message);
    return { error: "Network error" };
  }
};

// Cancel Appointment
export const cancelAppointment = async (appointmentId, reason) => {
  try {
    const token = getAuthToken();
    const res = await fetch(
      `${API_BASE}/api/appointment-routes/${appointmentId}/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding the token here
        },
        body: JSON.stringify({ reason }),
      }
    );
    return await res.json();
  } catch (err) {
    console.error("❌ cancelAppointment error:", err.message);
    return { error: "Network error" };
  }
};

// Register Appointment
export const registerAppointment = async (appointmentData) => {
  try {
    const token = getAuthToken(); // Get the auth token

    const res = await fetch(`${API_BASE}/api/appointment-routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
      body: JSON.stringify(appointmentData),
    });

    return await res.json();
  } catch (err) {
    console.error("❌ registerAppointment error:", err.message);
    return { error: "Network error" };
  }
};

// Update Appointment Status API Call
// Update Appointment Status to "Completed"
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const token = getAuthToken(); // Get the auth token
    const res = await fetch(
      `${API_BASE}/api/appointment-routes/${appointmentId}/status`, // Assuming this is the correct endpoint
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        errorResponse.message || "Failed to update appointment status"
      );
    }

    return await res.json(); // Return the successful response
  } catch (err) {
    console.error("❌ updateAppointmentStatus error:", err.message);
    return { error: err.message || "Network error" }; // Return the error message if something goes wrong
  }
};
