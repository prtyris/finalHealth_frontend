import React, { useState } from 'react';
import Header from './components/Header';
import PatientRecords from './components/views/PatientRecords';
import MedicalHistory from './components/views/MedicalHistory';
import PatientDashboard from './components/views/PatientDashboard';
import AddHealthRecordModal from './components/modals/AddHealthRecordModal';
import PatientRecordUploadModal from './components/modals/PatientRecordUploadModal';
import logo from './components/assets/logo.png';

const Patients = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('patientRecords');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modals, setModals] = useState({
    addHealthRecord: false,
    patientRecordUpload: false
  });

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const handleViewMedicalHistory = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('medicalHistory');
  };

  const handleViewPatientDashboard = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('patientDashboard');
  };

  const handleBackToPatients = () => {
    setCurrentView('patientRecords');
  };

  const handleNewRecord = () => {
    openModal('addHealthRecord');
  };

  const handlePatientRecordUpload = () => {
    openModal('patientRecordUpload');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'patientRecords':
        return (
          <PatientRecords 
            darkMode={darkMode}
            onViewMedicalHistory={handleViewMedicalHistory}
            onViewPatientDashboard={handleViewPatientDashboard}
            onAddRecord={() => openModal('addHealthRecord')}
            onUploadRecords={() => openModal('patientRecordUpload')}
          />
        );
      case 'medicalHistory':
        return (
          <MedicalHistory 
            darkMode={darkMode}
            patient={selectedPatient}
            onBack={handleBackToPatients}
          />
        );
      case 'patientDashboard':
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
            onAddRecord={() => openModal('addHealthRecord')}
            onUploadRecords={() => openModal('patientRecordUpload')}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex flex-col h-screen">
        <Header 
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          logo={logo}
        />
        
        {/* Navigation - Only Patient Records now */}
        <nav className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentView('patientRecords')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'patientRecords'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } ${darkMode ? 'text-gray-300 hover:text-gray-100' : ''}`}
              >
                Patient Records
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderCurrentView()}
        </main>

        {/* Modals */}
        <AddHealthRecordModal 
          isOpen={modals.addHealthRecord}
          onClose={() => closeModal('addHealthRecord')}
          darkMode={darkMode}
        />

        <PatientRecordUploadModal 
          isOpen={modals.patientRecordUpload}
          onClose={() => closeModal('patientRecordUpload')}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Patients;