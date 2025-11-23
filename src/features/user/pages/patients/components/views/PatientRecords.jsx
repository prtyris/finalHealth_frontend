import React, { useState, useRef } from 'react';

const PatientRecords = ({ darkMode, onViewMedicalHistory, onViewPatientDashboard, onAddRecord, onUploadRecords }) => {
  const patients = [
    {
      id: 74,
      name: 'Carl Joseph B. Orenz',
      gender: 'Male',
      age: 25,
      contacts: '09673645282',
      email: 'carjoseph@email.com',
      address: '123 Acacia St Unit 28, Barangay 76, Davao City, Davao Del Sur 8000, Philippines'
    },
    {
      id: 75,
      name: 'Carl Ivan Sampan',
      gender: 'Male',
      age: 35,
      contacts: '0965847174',
      email: 'carlivan@email.com',
      address: '123 St, Manila'
    },
    {
      id: 76,
      name: 'Kristine Hilario',
      gender: 'Female',
      age: 37,
      contacts: '0927582365',
      email: 'kristinehilario@email.com',
      address: 'Crystal St, Davao'
    }
  ];

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [uploadStatus, setUploadStatus] = useState({});
  const fileInputRef = useRef(null);

  const handleExportPDF = () => {
    alert('Exporting patient records as PDF...');
  };

  const handleFileUpload = (section) => {
    setCurrentSection(section);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadStatus(prev => ({
        ...prev,
        [currentSection]: file.name
      }));
      setShowUploadModal(true);
    }
  };

  const handleUploadConfirm = () => {
    alert(`File uploaded for ${currentSection}: ${uploadStatus[currentSection]}`);
    setShowUploadModal(false);
  };

  return (
    <div className={`min-h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`rounded-lg shadow-sm p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Patient Records
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input 
                type="text" 
                placeholder="Search" 
                className={`px-3 py-2 border rounded-lg w-full sm:w-64 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  className={`px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>to</span>
                <input 
                  type="date" 
                  className={`px-3 py-2 border rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <button 
                onClick={handleExportPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`rounded-lg shadow-sm p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onAddRecord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Add Health Record
            </button>
            <button 
              onClick={onUploadRecords}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📁 Patient Record Upload
            </button>
            <button 
              onClick={() => handleFileUpload('Visit Information')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📎 Quick Upload
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Record ID
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Customer Name
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Gender
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Age
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Contacts
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Email
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {patients.map(patient => (
                  <tr key={patient.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.id}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.gender}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.age}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.contacts}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => onViewMedicalHistory(patient)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm underline"
                        >
                          View Medical History
                        </button>
                        <button 
                          onClick={() => onViewPatientDashboard(patient)}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm underline"
                        >
                          Patient Dashboard
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload for {currentSection}
              </h3>
              <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {uploadStatus[currentSection] || 'No file chosen'}
              </div>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUploadConfirm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;