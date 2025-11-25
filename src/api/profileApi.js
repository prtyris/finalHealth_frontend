const API_BASE = import.meta.env.VITE_API_BASE;

// apiCalls.js
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${API_BASE}/api/users/${userId}/profile`, {
      method: "PUT", // Using PUT to update profile
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData), // Send the profile data as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update profile");
    }

    const data = await response.json();
    return data; // Return the updated profile data
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Throw the error to be caught in the component
  }
};

// apiCalls.js

export const getUserPersonalInfo = async (userId) => {
  try {
    const response = await fetch(
      `${API_BASE}/api/users/${userId}/personal-info`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user info");
    }

    const data = await response.json();
    return data.userInfo; // Return the personal info data
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
