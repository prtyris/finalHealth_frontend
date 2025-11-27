const API_BASE = import.meta.env.VITE_API_BASE;
const getAuthToken = () => {
  return localStorage.getItem("user_token"); // Adjust as per your token storage method
};

const getUser = () => {
  return localStorage.getItem("user");
};
// apiCalls.js
export const updateProfile = async (userId, profileData) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_BASE}/api/users/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    return await res.json();
  } catch (err) {
    console.error("❌ updateProfile error:", err.message);
    return { success: false, error: "Network error" };
  }
};
// apiCalls.js

export const getPersonalInfo = async (userId) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_BASE}/api/users/${userId}/personal-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (err) {
    console.error("❌ getPersonalInfo error:", err.message);
    return { success: false, error: "Network error" };
  }
};

export const updateUserSettings = async (data) => {
  try {
    const token = localStorage.getItem("user_token");

    const formData = new FormData();

    if (data.currentPassword)
      formData.append("currentPassword", data.currentPassword);
    if (data.newPassword) formData.append("newPassword", data.newPassword);
    if (data.imageFile) formData.append("profileImg", data.imageFile); // MUST match multer name

    const res = await fetch(`${API_BASE}/api/users/update-settings`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // NO content-type on purpose
      },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error("❌ updateUserSettings error:", err);
    return { success: false, error: "Network error" };
  }
};
