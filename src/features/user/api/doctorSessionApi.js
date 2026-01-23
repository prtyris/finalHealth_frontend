import { apiRequest } from "../../../api/httpClient/httpClient";

export const getDoctorScheduleInClinicApi = (doctorId, clinicId) =>
  apiRequest(
    `/api/doctor-session-routes/doctor/${doctorId}/clinic/${clinicId}/sessions`
  );

export const getAllDoctorSessionsApi = (doctorId) =>
  apiRequest(`/api/doctor-session-routes/doctor/${doctorId}/sessions`);

export const createDoctorSessionApi = (doctorSessionData) =>
  apiRequest(`/api/doctor-session-routes/`, {
    method: "POST",
    body: JSON.stringify(doctorSessionData),
  });
export const deleteSessionApi = (sessionId) =>
  apiRequest(`/api/doctor-session-routes/session/${sessionId}/delete`, {
    method: "DELETE",
  });
