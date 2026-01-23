import { apiRequest } from "../../../api/httpClient/httpClient";

export const getQueueOfDoctorInClinicApi = (doctorId, clinicId) =>
  apiRequest(`/api/queue-routes/doctor/${doctorId}/clinic/${clinicId}`);

export const updateQueueStatusApi = (appointmentId, status) =>
  apiRequest(`/api/queue-routes/queue-entry/${appointmentId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

export const addQueueApi = (queueData) =>
  apiRequest(`/api/queue-routes/`, {
    method: "POST",
    body: JSON.stringify(queueData),
  });
