import React from 'react';

const MedicalHistory = ({ darkMode, patient, onBack }) => {
  // Default patient data if none is passed
  const patientData = patient || {
    id: 74,
    name: 'Carl Joseph B. Orence',
    gender: 'Male',
    birthdate: '09/23/2000',
    age: 28,
    contactNumber: '09673645282',
    address: '123 Acacia Street, Unit 28, Barangay 76, Davao City, Davao Del Sur 8000, Philippines'
  };

  const medicalHistory = {
    visitDate: '10/8/2025',
    time: '10:00AM–11:00AM',
    duration: '1 Hour',
    visitType: 'Consultation',
    physician: 'Carl Ivan Sampan',
    chiefComplaint: 'High fever and chills',
    visitReason: 'Check-up',
    fecalExamination: 'Negative',
    physicalExamination: 'Normal',
    primaryDiagnosis: 'Acute Febrile illness',
    bodyCondition: 'Ill-looking but conscious and coherent',
    overallHealth: 'Moderate Fever',
    medicationGiven: 'Paracetamol 500 mg',
    prescription: '1 tablet every 4–6 hrs',
    notes: 'Monitor temperature regularly. Return to clinic if fever persists beyond 2–3 days.'
  };

  const handleDownloadPDF = () => {
    alert('Downloading medical history as PDF...');
  };

  const handleEditMedicalHistory = () => {
    alert('Opening medical history editor...');
  };

  return (
    <div className={`min-h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`rounded-lg shadow-sm p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                ← Back to Patients
              </button>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Medical History
              </h1>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Patient Information Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Name:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.name}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gender:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.gender}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Birthdate:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.birthdate}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Age:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.age}</p>
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contact Number:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.contactNumber}</p>
              </div>
              <div className="md:col-span-3">
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Address:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{patientData.address}</p>
              </div>
            </div>
          </div>

          {/* Medical History Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Medical History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visit Date:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.visitDate}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Time:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.time}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Duration:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.duration}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visit Type:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.visitType}</p>
              </div>
            </div>
          </div>

          {/* Visit Information */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Visit Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Physician:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.physician}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Chief Complaint:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.chiefComplaint}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Visit Reason:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.visitReason}</p>
              </div>
            </div>
          </div>

          {/* Test and Procedures */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Test and Procedures
            </h2>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fecal Examination:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.fecalExamination}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Physical Examination:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.physicalExamination}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis and Assessment */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Diagnosis and Assessment
            </h2>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Primary Diagnosis:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.primaryDiagnosis}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Body Condition:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.bodyCondition}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overall Health:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.overallHealth}</p>
              </div>
            </div>
          </div>

          {/* Treatment and Medication */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Treatment and Medication
            </h2>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Medication Given:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.medicationGiven}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Prescription:
                </label>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{medicalHistory.prescription}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Notes
            </h2>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{medicalHistory.notes}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button 
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Download PDF
              </button>
              <button 
                onClick={handleEditMedicalHistory}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Edit Medical History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;