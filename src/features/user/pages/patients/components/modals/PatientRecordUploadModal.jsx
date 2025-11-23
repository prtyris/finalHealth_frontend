import React, { useState, useRef } from 'react';

const PatientRecordUploadModal = ({ isOpen, onClose, darkMode }) => {
  const [uploadStatus, setUploadStatus] = useState({});
  const fileInputRefs = {
    'Visit Information': useRef(null),
    'Vital Signs': useRef(null),
    'Test and Procedures': useRef(null),
    'Treatment and Medication': useRef(null),
    'Diagnosis and Assessment': useRef(null),
    'Notes': useRef(null)
  };

  const sections = [
    {
      title: 'Visit Information',
      description: 'Attach details related to visit'
    },
    {
      title: 'Vital Signs',
      description: 'Upload patient vitals'
    },
    {
      title: 'Test and Procedures',
      description: 'Attach lab test or procedure'
    },
    {
      title: 'Treatment and Medication',
      description: 'Attach prescription or medication notes'
    },
    {
      title: 'Diagnosis and Assessment',
      description: 'Attach doctor diagnosis and assessment'
    },
    {
      title: 'Notes',
      description: 'Attach nurse or doctor notes'
    }
  ];

  const handleChooseFile = (section) => {
    fileInputRefs[section].current?.click();
  };

  const handleFileSelect = (section, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadStatus(prev => ({
        ...prev,
        [section]: file.name
      }));
    }
  };

  const handleSave = () => {
    alert('All files saved successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className={`rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Patient Record Upload
            </h3>
            <button 
              onClick={onClose}
              className={`text-2xl p-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
            >
              ×
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(section => (
              <div key={section.title} className={`p-4 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h4>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.description}
                </p>
                <div className={`text-sm mb-3 p-2 rounded ${
                  darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {uploadStatus[section.title] || 'No file chosen'}
                </div>
                <button 
                  onClick={() => handleChooseFile(section.title)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Choose File
                </button>
                <input 
                  type="file" 
                  ref={fileInputRefs[section.title]}
                  onChange={(e) => handleFileSelect(section.title, e)}
                  className="hidden"
                  accept="*/*"
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordUploadModal;