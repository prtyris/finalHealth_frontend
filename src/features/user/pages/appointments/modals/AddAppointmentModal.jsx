import React, { useState, useEffect } from "react";
import { registerAppointment } from "../../../../../api/appointmentApi.js"; // API call for appointment creation
import { getAllPatients } from "../../../../../api/patientApi.js"; // API call for fetching patients
import { getDoctors } from "../../../../../api/doctorApi.js"; // API call to get all doctors
import { getClinicsOfDoctor } from "../../../../../api/doctorApi.js"; // API call to get clinic of a doctor

const AddAppointmentModal = ({ isOpen, onClose }) => {
  const [patientType, setPatientType] = useState(""); // New or Returning Patient
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [searchTerm, setSearchTerm] = useState(""); // Search term for returning patients
  const [patients, setPatients] = useState([]); // Store list of matching patients
  const [doctors, setDoctors] = useState([]); // Store list of doctors
  const [clinics, setClinics] = useState([]); // Store list of clinics
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    clinicId: "",
    doctorId: "",
    appointmentDate: "",
    patientId: "", // Initially empty for new patients
    patientTypeId: 1, // Default to normal type for new patients
    address: "", // Add the address for new patients
  });

  // Fetch all patients and doctors on mount
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await getAllPatients(); // Fetch patients from the backend
      if (res.success) {
        setPatients(res.patients); // Store the fetched patients
      } else {
        console.error("Failed to load patients:", res?.error);
      }
    };
    fetchPatients();

    // Fetch all doctors
    const fetchDoctors = async () => {
      const res = await getDoctors();
      if (res.success) {
        setDoctors(res.doctors);
      } else {
        console.error("Failed to load doctors:", res?.error);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch clinics of selected doctor
  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setFormData((prev) => ({ ...prev, doctorId }));

    if (doctorId) {
      const res = await getClinicsOfDoctor(doctorId);
      if (res.success) {
        setClinics(res.clinics); // Set clinics based on selected doctor
      } else {
        console.error("Failed to load clinics:", res?.error);
      }
    } else {
      setClinics([]); // Clear clinics if no doctor is selected
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePatientSelection = (patient) => {
    setFormData((prev) => ({
      ...prev,
      patientId: patient.patientId,
      firstName: patient.fName,
      middleName: patient.mName,
      lastName: patient.lName,
      contactNumber: patient.contactNumber,
      email: patient.email,
      patientTypeId: patient.patientTypeId,
    }));
  };

  const handlePatientTypeChange = (type) => {
    setPatientType(type); // Switch between New and Returning Patient
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await registerAppointment(formData); // API call to save the appointment
      if (response.success) {
        alert("Appointment created successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to create appointment.");
      }
    } catch (error) {
      alert("Error occurred while creating appointment.");
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Add Appointment
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Patient Type Selection */}
          <div>
            <button
              type="button"
              onClick={() => handlePatientTypeChange("New")}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              New Patient
            </button>
            <button
              type="button"
              onClick={() => handlePatientTypeChange("Returning")}
              className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg mt-2"
            >
              Returning Patient
            </button>
          </div>

          {/* Returning Patient Search */}
          {patientType === "Returning" && (
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Search by name or contact"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {patients
                    .filter(
                      (patient) =>
                        patient.fName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        patient.contactNumber.includes(searchTerm)
                    )
                    .map((patient) => (
                      <div
                        key={patient.patientId}
                        className="flex justify-between items-center p-2 mt-2 border border-gray-300 rounded-lg"
                      >
                        <div>{`${patient.fName} ${patient.lName}`}</div>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                          onClick={() => handlePatientSelection(patient)}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* New Patient Form */}
          {patientType === "New" && (
            <>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Middle Name</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) =>
                    handleInputChange("middleName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Contact Number</label>
                <input
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}

          {/* Doctor Selection */}
          <div>
            <label>Doctor</label>
            <select
              value={formData.doctorId}
              onChange={handleDoctorChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.fName} {doctor.lName}
                </option>
              ))}
            </select>
          </div>

          {/* Clinic Selection */}
          <div>
            <label>Clinic</label>
            <select
              value={formData.clinicId}
              onChange={(e) => handleInputChange("clinicId", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Clinic</option>
              {clinics.map((clinic) => (
                <option key={clinic.clinic_id} value={clinic.clinic_id}>
                  {clinic.clinic_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Appointment Date</label>
            <input
              type="date"
              value={formData.appointmentDate}
              onChange={(e) =>
                handleInputChange("appointmentDate", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
