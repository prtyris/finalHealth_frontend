import React, { useState, useEffect } from "react";
import AddDoctorModal from "./components/modals/AddDoctorModal";
import AddClinicModal from "./components/modals/AddClinicModal";
import EditClinicModal from "./components/modals/EditClinicModal";
import AddSessionModal from "./components/modals/AddSessionModal";
import EditSessionModal from "./components/modals/EditSessionModal";
import ScheduleListView from "./components/ScheduleListView";
import ManageDoctorView from "./components/ManageDoctorView";
import Layout from "../../components/Layout";

import { getDoctors, getClinicsOfDoctor } from "../../../../api/doctorApi";
import {
  addDoctorSession,
  getDoctorSessions,
} from "../../../../api/doctorSessionApi";

import {
  getUnassignedClinics,
  registerClinic,
} from "../../../../api/clinicApi";

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

  const [affiliatedClinics, setAffiliatedClinics] = useState([]);

  useEffect(() => {
    async function loadAffiliated() {
      if (!selectedDoctor?.id) return;

      const data = await getClinicsOfDoctor(selectedDoctor.id);

      if (data?.success && Array.isArray(data.clinics)) {
        const mapped = data.clinics.map((c) => {
          return {
            id: c.clinic_id,
            name: c.clinic_name,
            address: c.address,
            openHours: c.open_hours,
            openDays: c.open_days,
            contact: c.contact_num || "N/A",
          };
        });

        setAffiliatedClinics(mapped);
      } else {
        setAffiliatedClinics([]);
      }
    }

    loadAffiliated();
  }, [selectedDoctor]);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const data = await getDoctors();

        if (data?.success && Array.isArray(data.doctors)) {
          const mapped = data.doctors.map((d) => ({
            id: d.doctorId,
            name: `Dr. ${d.fName} ${d.lName}`,
            specialization: d.specialization,
            license: d.licenseNumber,
            contact: "N/A", // backend does NOT provide contact yet
            education: d.education,
            gender: d.gender,
            dob: "N/A", // backend does NOT provide birthday
            experience: `${d.yearsExperience} years`,
            address: d.address,
            status: d.verificationStatus,
          }));

          setDoctors(mapped);
        } else {
          console.error("Invalid doctor API response:", data);
        }
      } catch (error) {
        console.error("Failed to load doctors:", error);
      }
    }

    loadDoctors();
  }, []);

  const [unassignedClinics, setUnassignedClinics] = useState([]);

  // =======================
  // LOAD ALL UNASSIGNED CLINICS
  // =======================
  useEffect(() => {
    async function loadUnassigned() {
      if (!selectedDoctor?.id) return;

      const data = await getUnassignedClinics(selectedDoctor.id);

      if (data?.success && Array.isArray(data.clinics)) {
        const mapped = data.clinics.map((c) => ({
          id: c.clinicId,
          name: c.clinicName,
          address: c.address,

          opening: c.openHours?.split("-")[0]?.trim() || "N/A",
          closing: c.openHours?.split("-")[1]?.trim() || "N/A",
          days: c.openDays || "N/A",

          contact: c.contactNum || "N/A",
          backup: c.backupNum || "N/A",
          businessPermit: c.businessPermitNo || "N/A",

          owner: c.ownerName || "N/A",
          image: c.profileImagePath || null,
          status: c.verificationStatus || "N/A",
        }));

        setUnassignedClinics(mapped);
      } else {
        setUnassignedClinics([]);
      }
    }

    loadUnassigned();
    console.log(loadUnassigned());
  }, [selectedDoctor]);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function loadDoctorSessions() {
      if (!selectedDoctor?.id) return;

      const data = await getDoctorSessions(selectedDoctor.id);

      if (data?.success && Array.isArray(data.sessions)) {
        const mapped = data.sessions.map((s) => ({
          id: s.sessionId,
          day: s.dayOfWeek,
          clinic:
            affiliatedClinics.find((c) => c.id === s.clinicId)?.name ||
            "Unknown Clinic",
          startTime: s.startTime.slice(0, 5), // "09:00:00" → "09:00"
          endTime: s.endTime.slice(0, 5),
        }));

        setSessions(mapped);
      } else {
        setSessions([]);
      }
    }

    loadDoctorSessions();
  }, [selectedDoctor, affiliatedClinics]);

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

  const [clinicAdded, setClinicAdded] = useState(false);

  const handleAddClinic = async (clinicData) => {
    try {
      const result = await registerClinic(clinicData);

      if (!result?.success) {
        alert(result?.error || "Failed to add clinic.");
        return;
      }

      alert("Clinic added successfully.");
      setClinicAdded(true); // trigger useEffect
      closeModal("addClinic");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding the clinic.");
    }
  };

  useEffect(() => {
    if (clinicAdded) {
      window.location.reload();
    }
  }, [clinicAdded]);

  const handleAddSession = async (sessionData) => {
    try {
      const payload = {
        doctorId: selectedDoctor.id,
        clinicId: sessionData.clinicId,
        dayOfWeek: sessionData.dayOfWeek,
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
      };

      const result = await addDoctorSession(payload);

      if (!result?.success) {
        alert(result?.error || "Failed to add doctor session.");
        return;
      }

      alert("Session added successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding the session.");
    }
  };

  const handleEditClinicSubmit = (clinicData) => {
    setClinicAdded((prev) =>
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
      setClinicAdded((prev) => prev.filter((clinic) => clinic.id !== clinicId));
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
            onAddClinic={() => openModal("addClinic")}
            onManageDoctor={handleManageDoctor}
          />
        ) : (
          <ManageDoctorView
            darkMode={darkMode}
            doctor={selectedDoctor}
            unassignedClinics={unassignedClinics}
            affiliatedClinics={affiliatedClinics}
            sessions={sessions}
            onBack={() => setCurrentView("scheduleList")}
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
          affiliatedClinics={affiliatedClinics}
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
