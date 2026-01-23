import { useState } from "react";
import { PatientContext } from "./PatientContext.jsx";
import {
  getPatientOfDoctorInClinicApi,
  createPatientApi,
  updatePatientInfoApi,
} from "../../api/patientApi.js";

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPatientOfDoctorInClinic = async (doctorId, clinicId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getPatientOfDoctorInClinicApi(doctorId, clinicId);

      console.log(!res.ok);
      if (!res.ok) {
        console.log("inside the error");
        setError(res.message);
        setLoading(false);
        return;
      }

      console.log(res.data);
      setPatients(res.data.patients || []);
    } catch (err) {
      setError("Something went wrong");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData) => {
    setLoading(true);
    setError(null);

    const res = await createPatientApi(patientData);

    console.log(!res.ok);
    if (!res.ok) {
      console.log("inside the error");
      setError(res.message);
      setLoading(false);
      return;
    }

    await getPatientOfDoctorInClinic(
      patientData.doctorId,
      patientData.clinicId
    );

    setLoading(false);
  };

  const updatePatientInfo = async (patientId, patientData) => {
    setLoading(true);
    setError(null);

    const res = await updatePatientInfoApi(patientId, patientData);

    if (!res.ok) {
      setError(res.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    return true;
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        loading,
        error,
        getPatientOfDoctorInClinic,
        createPatient,
        updatePatientInfo,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
