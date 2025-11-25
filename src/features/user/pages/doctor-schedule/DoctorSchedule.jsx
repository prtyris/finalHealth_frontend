import React, { useState } from "react";
import AddDoctorModal from "./components/modals/AddDoctorModal";
import AddClinicModal from "./components/modals/AddClinicModal";
import EditClinicModal from "./components/modals/EditClinicModal";
import AddSessionModal from "./components/modals/AddSessionModal";
import EditSessionModal from "./components/modals/EditSessionModal";
import ScheduleListView from "./components/ScheduleListView";
import ManageDoctorView from "./components/ManageDoctorView";
import Layout from "../../components/Layout";

const DoctorSchedule = ({ darkMode }) => {
  const [currentView, setCurrentView] = useState("scheduleList");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [modals, setModals] = useState({
    addDoctor: false,
    addClinic: false,
    editClinic: false,
    addSession: false,
    editSession: false,
  });

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Arias Reyes",
      specialization: "Internal Medicine",
      license: "PRC-175803",
      contact: "0917-345-6789",
      education: "UST Faculty of Medicine",
      gender: "Male",
      dob: "1988-03-10",
      experience: "15 years",
    },
    {
      id: 2,
      name: "Dr. Adrian Reyes",
      specialization: "General Practice",
      license: "MED-123456",
      contact: "0917-234-4567",
      education: "University of the Philippines",
      gender: "Male",
      dob: "1985-07-15",
      experience: "12 years",
    },
  ]);

  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: "CityHealth Clinic",
      address: "Makati City",
      opening: "08:00",
      closing: "17:00",
      contact: "0917-321-1111",
    },
  ]);

  const [sessions, setSessions] = useState([
    {
      id: 1,
      day: "Monday",
      clinic: "CityHealth Clinic",
      sessionType: "morning",
      startTime: "08:00",
      endTime: "12:00",
    },
    {
      id: 2,
      day: "Tuesday",
      clinic: "MediCare Center",
      sessionType: "afternoon",
      startTime: "14:00",
      endTime: "18:00",
    },
  ]);

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleManageDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentView("manage");
  };

  const handleEditClinic = (clinic) => {
    setSelectedClinic(clinic);
    openModal("editClinic");
  };

  const handleEditSession = (session) => {
    setSelectedSession(session);
    openModal("editSession");
  };

  const handleAddDoctor = (doctorData) => {
    const newDoctor = {
      id: doctors.length + 1,
      name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
      specialization: doctorData.specialization,
      license: doctorData.licenseNumber,
      contact: doctorData.contactNumber,
      education: "Medical School",
      gender: "Male",
      dob: doctorData.dateOfBirth,
      experience: "0 years",
    };
    setDoctors((prev) => [...prev, newDoctor]);
    closeModal("addDoctor");
  };

  const handleAddClinic = (clinicData) => {
    const newClinic = {
      id: clinics.length + 1,
      name: clinicData.name,
      address: clinicData.address,
      opening: clinicData.openingHours,
      closing: clinicData.closingHours,
      contact: clinicData.contactNumber,
    };
    setClinics((prev) => [...prev, newClinic]);
    closeModal("addClinic");
  };

  const handleAddSession = (sessionData) => {
    const newSession = {
      id: sessions.length + 1,
      day:
        sessionData.dayOfWeek.charAt(0).toUpperCase() +
        sessionData.dayOfWeek.slice(1),
      clinic:
        sessionData.clinic === "cityhealth"
          ? "CityHealth Clinic"
          : "MediCare Center",
      sessionType: sessionData.sessionType,
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
    };
    setSessions((prev) => [...prev, newSession]);
    closeModal("addSession");
  };

  const handleEditClinicSubmit = (clinicData) => {
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === selectedClinic?.id ? { ...clinic, ...clinicData } : clinic
      )
    );
    closeModal("editClinic");
  };

  const handleEditSessionSubmit = (sessionData) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === selectedSession?.id
          ? {
              ...session,
              day:
                sessionData.dayOfWeek.charAt(0).toUpperCase() +
                sessionData.dayOfWeek.slice(1),
              clinic:
                sessionData.clinic === "cityhealth"
                  ? "CityHealth Clinic"
                  : "MediCare Center",
              sessionType: sessionData.sessionType,
              startTime: sessionData.startTime,
              endTime: sessionData.endTime,
            }
          : session
      )
    );
    closeModal("editSession");
  };

  const handleDeleteClinic = (clinicId) => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      setClinics((prev) => prev.filter((clinic) => clinic.id !== clinicId));
    }
  };

  const handleDeleteSession = (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {currentView === "scheduleList" ? (
          <ScheduleListView
            darkMode={darkMode}
            doctors={doctors}
            onAddDoctor={() => openModal("addDoctor")}
            onManageDoctor={handleManageDoctor}
          />
        ) : (
          <ManageDoctorView
            darkMode={darkMode}
            doctor={selectedDoctor}
            clinics={clinics}
            sessions={sessions}
            onBack={() => setCurrentView("scheduleList")}
            onAddClinic={() => openModal("addClinic")}
            onEditClinic={handleEditClinic}
            onAddSession={() => openModal("addSession")}
            onEditSession={handleEditSession}
            onDeleteClinic={handleDeleteClinic}
            onDeleteSession={handleDeleteSession}
          />
        )}

        {/* Modals */}
        <AddDoctorModal
          isOpen={modals.addDoctor}
          onClose={() => closeModal("addDoctor")}
          onSubmit={handleAddDoctor}
          darkMode={darkMode}
        />

        <AddClinicModal
          isOpen={modals.addClinic}
          onClose={() => closeModal("addClinic")}
          onSubmit={handleAddClinic}
          darkMode={darkMode}
        />

        <EditClinicModal
          isOpen={modals.editClinic}
          onClose={() => closeModal("editClinic")}
          onSubmit={handleEditClinicSubmit}
          darkMode={darkMode}
          clinicData={selectedClinic}
        />

        <AddSessionModal
          isOpen={modals.addSession}
          onClose={() => closeModal("addSession")}
          onSubmit={handleAddSession}
          darkMode={darkMode}
        />

        <EditSessionModal
          isOpen={modals.editSession}
          onClose={() => closeModal("editSession")}
          onSubmit={handleEditSessionSubmit}
          darkMode={darkMode}
          sessionData={selectedSession}
        />
      </div>
    </Layout>
  );
};

export default DoctorSchedule;
