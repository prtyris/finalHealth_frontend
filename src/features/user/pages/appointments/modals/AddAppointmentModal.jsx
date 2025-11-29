import React, { useState, useEffect } from "react";
import { registerAppointment } from "../../../../../api/appointmentApi.js";
import { getAllPatients } from "../../../../../api/patientApi.js";
import {
  getDoctors,
  getClinicsOfDoctor,
} from "../../../../../api/doctorApi.js";
import { getDoctorSessions } from "../../../../../api/doctorSessionApi.js";

const AddAppointmentModal = ({ isOpen, onClose }) => {
  const [patientType, setPatientType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);

  // NEW: sessions
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

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
    sessionId: "", // NEW: add sessionId
    appointmentDate: "",
    patientId: "",
    patientTypeId: 1,
    address: "",
  });

  // Load patients and doctors
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await getAllPatients();
      if (res.success) setPatients(res.patients);
    };
    fetchPatients();

    const fetchDoctors = async () => {
      const res = await getDoctors();
      if (res.success) setDoctors(res.doctors);
    };
    fetchDoctors();
  }, []);

  // Load doctor sessions after doctor+clinic is selected
  const loadDoctorSessions = async (doctorId, clinicId) => {
    if (!doctorId || !clinicId) return;
    setLoadingSessions(true);

    const res = await getDoctorSessions(doctorId);
    if (res?.success) {
      const filtered = res.sessions.filter(
        (s) => s.clinicId === Number(clinicId)
      );
      setSessions(filtered);
    } else {
      setSessions([]);
    }

    setLoadingSessions(false);
  };

  // doctor change → load clinics
  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setFormData((prev) => ({ ...prev, doctorId, clinicId: "", sessionId: "" }));
    setClinics([]);
    setSessions([]);

    if (doctorId) {
      const res = await getClinicsOfDoctor(doctorId);
      if (res.success) setClinics(res.clinics);
    }
  };

  // clinic change → load sessions
  const handleClinicSelect = async (e) => {
    const clinicId = e.target.value;
    setFormData((prev) => ({ ...prev, clinicId, sessionId: "" }));

    if (formData.doctorId && clinicId) {
      await loadDoctorSessions(formData.doctorId, clinicId);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await registerAppointment(formData);
      if (response.success) {
        alert("Appointment created successfully!");
        onClose();
      } else {
        alert(response.error || "Failed to create appointment.");
      }
    } catch (error) {
      alert("Error occurred while creating appointment.");
    }

    setIsLoading(false);
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 || 12;
    return `${display}:${m} ${ampm}`;
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
          {/* Patient Type */}
          <div>
            <button
              type="button"
              onClick={() => setPatientType("New")}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            >
              New Patient
            </button>
            <button
              type="button"
              onClick={() => setPatientType("Returning")}
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

              {patients
                .filter(
                  (p) =>
                    p.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.contactNumber.includes(searchTerm)
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

          {/* New Patient Inputs */}
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

          {/* Doctor */}
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

          {/* Clinic */}
          <div>
            <label>Clinic</label>
            <select
              value={formData.clinicId}
              onChange={handleClinicSelect}
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

          {/* Doctor Session (NEW) */}
          {formData.doctorId && formData.clinicId && (
            <div>
              <label>Available Session</label>
              {loadingSessions ? (
                <p className="text-gray-500">Loading sessions...</p>
              ) : sessions.length === 0 ? (
                <p className="text-red-500">
                  No sessions available for this doctor at this clinic.
                </p>
              ) : (
                <select
                  value={formData.sessionId}
                  onChange={(e) =>
                    handleInputChange("sessionId", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select Session</option>
                  {sessions.map((s) => (
                    <option key={s.sessionId} value={s.sessionId}>
                      {s.dayOfWeek} — {formatTime(s.startTime)} to{" "}
                      {formatTime(s.endTime)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Appointment Date */}
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
