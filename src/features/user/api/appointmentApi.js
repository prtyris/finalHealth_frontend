import { apiRequest } from "../../../api/httpClient/httpClient";

export const getAllAppointmentsApi = (doctorId, clinicId) =>
  apiRequest(
    `/api/appointment-routes/doctor/${doctorId}/clinic/${clinicId}/appointments`
  );

export const craeteAppointmentApi = (appointmentData) =>
  apiRequest("/api/appointment-routes", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });

export const rescheduleAppointmentApi = (
  appointmentId,
  appointmentDate,
  appointmentType
) =>
  apiRequest(
    `/api/appointment-routes/appointment/${appointmentId}/reschedule`,
    {
      method: "PUT",
      body: JSON.stringify({ appointmentDate, appointmentType }),
    }
  );
export const cancelAppointmentApi = (appointmentId, reason) =>
  apiRequest(`/api/appointment-routes/appointment/${appointmentId}/cancel`, {
    method: "PUT",
    body: JSON.stringify({ reason }),
  });
