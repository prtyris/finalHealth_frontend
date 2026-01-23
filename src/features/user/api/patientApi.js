import { apiRequest } from "../../../api/httpClient/httpClient";

export const getPatientOfDoctorInClinicApi = (doctorId, clinicId) =>
  apiRequest(
    `/api/patient-routes/doctor/${doctorId}/clinic/${clinicId}/patients`,
  );
export const createPatientApi = (patientData) =>
  apiRequest(`/api/patient-routes`, {
    method: "POST",
    body: JSON.stringify(patientData),
  });
export const updatePatientInfoApi = (patientId, patientData) =>
  apiRequest(`/api/patient-routes/${patientId}/patient`, {
    method: "PUT",
    body: JSON.stringify(patientData),
  });
