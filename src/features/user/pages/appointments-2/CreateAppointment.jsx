import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, getClinicsOfDoctor } from "../../../../api/doctorApi"; // API calls
import { getAllPatients } from "../../../../api/patientApi"; // Fetch patients
import { registerAppointment } from "../../../../api/appointmentApi"; // API call for creating appointment
import Layout from "../../components/Layout";
import { Link } from "react-router-dom"; // For navigation to RegisterPatient

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorId: "",
    clinicId: "",
    appointmentDate: "",
    patientId: "", // Patient ID for existing patients
    patientTypeId: 1, // Default to normal for new patients
    appointmentType: "Consultation",
  });

  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]); // Stores fetched clinics
  const [patients, setPatients] = useState([]); // To store list of patients
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingClinics, setLoadingClinics] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false); // For loading patients
  const [clinicFetchError, setClinicFetchError] = useState(null); // To capture errors while fetching clinics
  const [submitting, setSubmitting] = useState(false); // To handle submit loading state

  // Fetch doctors on page load
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const res = await getDoctors();
        if (res?.success) {
          setDoctors(res.doctors || []);
        } else {
          console.error("Failed to load doctors:", res?.error);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
      setLoadingDoctors(false);
    };

    fetchDoctors();
    fetchPatients(); // Fetch patients when component loads
  }, []);

  // Fetch patients
  const fetchPatients = async () => {
    setLoadingPatients(true);
    try {
      const res = await getAllPatients();
      if (res?.success) {
        setPatients(res.patients || []);
      } else {
        console.error("Failed to load patients:", res?.error);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
    setLoadingPatients(false);
  };

  // Fetch clinics based on selected doctor
  useEffect(() => {
    if (formData.doctorId) {
      setClinics([]); // Clear any existing clinics before fetching new ones
      setLoadingClinics(true); // Start loading state for clinics
      setClinicFetchError(null); // Reset any previous errors

      const fetchClinics = async () => {
        try {
          const res = await getClinicsOfDoctor(formData.doctorId);
          if (res?.success) {
            setClinics(res.clinics || []);
          } else {
            setClinicFetchError("Failed to load clinics for this doctor.");
          }
        } catch (error) {
          console.error("Error fetching clinics:", error);
          setClinicFetchError("Error fetching clinics, please try again.");
        }
        setLoadingClinics(false); // End loading state
      };

      fetchClinics(); // Fetch clinics when doctorId is set
    }
  }, [formData.doctorId]); // Depend on doctorId

  // Handle form input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Submit the appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validation
    if (
      !formData.patientId ||
      !formData.doctorId ||
      !formData.clinicId ||
      !formData.appointmentDate
    ) {
      alert(
        "Please fill in all required fields: Patient, Doctor, Clinic, and Date"
      );
      setSubmitting(false);
      return;
    }

    // Format the data according to API requirements
    const appointmentData = {
      patientId: parseInt(formData.patientId),
      doctorId: parseInt(formData.doctorId),
      clinical: parseInt(formData.clinicId), // Changed from clinicId to clinical
      appointmentDate: formData.appointmentDate,
      appointmentType: formData.appointmentType,
      priorityId: 2,
    };

    try {
      const res = await registerAppointment(appointmentData);
      if (res?.success) {
        alert("Appointment created successfully!");
        navigate("/appointments"); // Redirect back to appointments page
      } else {
        alert(
          "Failed to create appointment: " + (res?.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Error creating appointment, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center p-5 bg-gray-50">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => navigate("/appointments")}
            className="text-blue-600 underline mb-4"
          >
            Back
          </button>
          <h2 className="text-2xl font-semibold mb-4">Create Appointment</h2>

          <form onSubmit={handleSubmit}>
            {/* Patient Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Patient</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
                disabled={loadingPatients}
              >
                <option value="">
                  {loadingPatients ? "Loading patients..." : "Select Patient"}
                </option>
                {patients.map((patient) => (
                  <option key={patient.patientId} value={patient.patientId}>
                    {patient.fName} {patient.lName}
                  </option>
                ))}
              </select>
            </div>

            {/* Link to register new patient */}
            <div className="mb-4">
              <Link to="/user/appointments/create-patient">
                <button type="button" className="text-blue-600 underline">
                  Register New Patient
                </button>
              </Link>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Doctor</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.doctorId}
                onChange={(e) => handleInputChange("doctorId", e.target.value)}
                disabled={loadingDoctors}
              >
                <option value="">
                  {loadingDoctors ? "Loading doctors..." : "Select Doctor"}
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.fName} {doctor.lName}
                  </option>
                ))}
              </select>
            </div>

            {/* Clinic Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Clinic</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.clinicId}
                onChange={(e) => handleInputChange("clinicId", e.target.value)}
                disabled={loadingClinics || !formData.doctorId}
              >
                <option value="">
                  {!formData.doctorId
                    ? "Select doctor first"
                    : loadingClinics
                    ? "Loading clinics..."
                    : clinicFetchError
                    ? clinicFetchError
                    : "Select Clinic"}
                </option>
                {clinics.map((clinic) => (
                  <option key={clinic.clinicId} value={clinic.clinicId}>
                    {clinic.clinicName}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.appointmentDate}
                onChange={(e) =>
                  handleInputChange("appointmentDate", e.target.value)
                }
              />
            </div>

            {/* Appointment Type */}
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.appointmentType}
                onChange={(e) =>
                  handleInputChange("appointmentType", e.target.value)
                }
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              disabled={submitting}
            >
              {submitting ? "Creating Appointment..." : "Save Appointment"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAppointment;
