import React, { useState } from 'react';

const PatientDashboard = ({ darkMode, patient, onBack, onNewRecord }) => {
  const [fileStatus, setFileStatus] = useState({
    visit: 'No file chosen',
    vitals: 'No file chosen',
    test: 'No file chosen',
    treatment: 'No file chosen',
    diagnosis: 'No file chosen',
    notes: 'No file chosen',
    attach: 'No file chosen'
  });

  // Default patient data if none is passed
  const patientData = patient || {
    id: 74,
    name: 'Carl Joseph B. Orenz',
    gender: 'Male',
    age: 25,
    address: '123 Acacia St Unit 28, Barangay 76, Davao City, Davao Del Sur 8000, Philippines'
  };

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    if (file) {
      setFileStatus(prev => ({
        ...prev,
        [field]: file.name
      }));
    }
  };

  const handleDownloadPDF = () => {
    alert('Downloading medical history as PDF...');
  };

  const handleEditMedicalHistory = () => {
    alert('Opening medical history editor...');
  };

  const handleViewDownload = (documentType) => {
    alert(`Viewing/Downloading ${documentType}...`);
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
                Patient Dashboard
              </h1>
            </div>
            <button 
              onClick={onNewRecord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              + New Health Record
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Patient Information Card */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300">
                Patient Photo
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patientData.name}
                </h2>
                <div className={`flex items-center gap-4 mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Age: {patientData.age}</span>
                  <span>|</span>
                  <span>{patientData.gender}</span>
                </div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Address: {patientData.address}
                </p>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Medical History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-4 py-2 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visit Date</th>
                    <th className={`px-4 py-2 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Time</th>
                    <th className={`px-4 py-2 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Duration</th>
                    <th className={`px-4 py-2 text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visit Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>10/28/2023</td>
                    <td className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>10:00AM-11:00AM</td>
                    <td className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>1 hour</td>
                    <td className={`px-4 py-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Consultation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visit Information */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Visit Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Physician Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Physician: Carl Ivan Sampan
                </h4>
                <div className="space-y-2 mb-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Chief of Complaint: High fever and chills</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Visit Reason: Check-up</p>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('visit', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.visit}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>

              {/* Vitals Signs Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Vitals Signs
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <span>Weight:</span> <span className="font-semibold">45</span>
                  </div>
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <span>Temperature:</span> <span className="font-semibold">38.5</span>
                  </div>
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <span>Heart Rate:</span> <span className="font-semibold">100</span>
                  </div>
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <span>Resp Rate:</span> <span className="font-semibold">24</span>
                  </div>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('vitals', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.vitals}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test and Procedures */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Test and Procedures
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Test Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Fecal Examination: Negative
                </h4>
                <div className="space-y-2 mb-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Physical Examination: Normal</p>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('test', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.test}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>

              {/* Treatment Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Treatment and Medication
                </h4>
                <div className="space-y-2 mb-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Medication Given: Paracetamol 500 mg</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Prescription: 1 tablet every 4-6 hrs</p>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('treatment', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.treatment}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis and Assessment */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Diagnosis and Assessment
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Diagnosis Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Primary Diagnosis: Acute Febrile Illness
                </h4>
                <div className="space-y-2 mb-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Body Condition: Ill-looking but conscious and coherent</p>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Overall health: Moderate Fever</p>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('diagnosis', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.diagnosis}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>

              {/* Notes Card */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notes
                </h4>
                <div className="mb-4">
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Monitor temperature regularly. Return to clinic if fever persists beyond 2-3 days.
                  </p>
                </div>
                <div className="relative border rounded-lg p-2">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange('notes', e)}
                  />
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.notes}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attached Documents */}
          <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Attached Documents
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className={`p-4 rounded-lg border text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  X-Ray Image 1
                </div>
                <button 
                  onClick={() => handleViewDownload('X-Ray Image 1')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full"
                >
                  View/Download
                </button>
              </div>
              <div className={`p-4 rounded-lg border text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  X-Ray Image 2
                </div>
                <button 
                  onClick={() => handleViewDownload('X-Ray Image 2')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full"
                >
                  View/Download
                </button>
              </div>
            </div>
            <div className="relative border rounded-lg p-2 mb-4">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange('attach', e)}
              />
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{fileStatus.attach}</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Choose File</button>
              </div>
            </div>
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

export default PatientDashboard;