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
  return apiRequest("/api/users/update-settings", {
    method: "PATCH",
    body: data,
  });
};
export const updateProfileImageApi = (imageFile) => {
  const formData = new FormData();

  if (!imageFile) {
    throw new Error("No image file provided");
  }

  formData.append("profileImg", imageFile);

  return apiFormRequest("/api/users/update-picture", {
    method: "PATCH",
    body: formData,
  });
};

export const getPersonalInfoApi = () => apiRequest(`/api/users/personal-info`);
