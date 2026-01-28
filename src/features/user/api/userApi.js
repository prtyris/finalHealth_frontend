import { apiRequest } from "../../../api/httpClient/httpClient";
import { apiFormRequest } from "../../../api/httpClient/apiFormRequest";

export const loginUser = (email, password) =>
  apiRequest("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (payload) =>
  apiRequest("/api/users/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateUserSettingsApi = (data) => {
  const formData = new FormData();

  if (data.currentPassword) {
    formData.append("currentPassword", data.currentPassword);
  }

  if (data.newPassword) {
    formData.append("newPassword", data.newPassword);
  }

  if (data.imageFile) {
    formData.append("profileImg", data.imageFile);
  }

  return apiFormRequest("/api/users/update-settings", {
    method: "PATCH",
    body: formData,
  });
};
export const getPersonalInfoApi = () => apiRequest(`/api/users/personal-info`);
