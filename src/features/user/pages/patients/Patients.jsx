import React, { useState } from "react";
import Header from "./components/Header";
import PatientRecords from "./components/views/PatientRecords";
import MedicalHistory from "./components/views/MedicalHistory";
import PatientDashboard from "./components/views/PatientDashboard";
import AddHealthRecordModal from "./components/modals/AddHealthRecordModal";
import PatientRecordUploadModal from "./components/modals/PatientRecordUploadModal";
import logo from "./components/assets/logo.png";

import Layout from "../../components/Layout";

const Patients = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("patientRecords");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modals, setModals] = useState({
    addHealthRecord: false,
    patientRecordUpload: false,
  });

  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleViewMedicalHistory = (patient) => {
    setSelectedPatient(patient);
    setCurrentView("medicalHistory");
  };

  const handleViewPatientDashboard = (patient) => {
    setSelectedPatient(patient);
    setCurrentView("patientDashboard");
  };

  const handleBackToPatients = () => {
    setCurrentView("patientRecords");
  };

  const handleNewRecord = () => {
    openModal("addHealthRecord");
  };

  const handlePatientRecordUpload = () => {
    openModal("patientRecordUpload");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "patientRecords":
        return (
          <PatientRecords
            darkMode={darkMode}
            onViewMedicalHistory={handleViewMedicalHistory}
            onViewPatientDashboard={handleViewPatientDashboard}
            onAddRecord={() => openModal("addHealthRecord")}
            onUploadRecords={() => openModal("patientRecordUpload")}
          />
        );
      case "medicalHistory":
        return (
          <MedicalHistory
            darkMode={darkMode}
            patient={selectedPatient}
            onBack={handleBackToPatients}
          />
        );
      case "patientDashboard":
        return (
          <PatientDashboard
            darkMode={darkMode}
            patient={selectedPatient}
            onBack={handleBackToPatients}
            onNewRecord={handleNewRecord}
          />
        );
      default:
        return (
          <PatientRecords
            darkMode={darkMode}
            onViewMedicalHistory={handleViewMedicalHistory}
            onViewPatientDashboard={handleViewPatientDashboard}
            onAddRecord={() => openModal("addHealthRecord")}
            onUploadRecords={() => openModal("patientRecordUpload")}
          />
        );
    }
  };

  return (
    <Layout>
      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Main Content */}
          <main className="flex-1 overflow-auto">{renderCurrentView()}</main>

          {/* Modals */}
          <AddHealthRecordModal
            isOpen={modals.addHealthRecord}
            onClose={() => closeModal("addHealthRecord")}
            darkMode={darkMode}
          />

          <PatientRecordUploadModal
            isOpen={modals.patientRecordUpload}
            onClose={() => closeModal("patientRecordUpload")}
            darkMode={darkMode}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Patients;
