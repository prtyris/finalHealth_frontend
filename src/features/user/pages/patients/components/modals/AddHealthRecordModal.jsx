import React, { useState } from 'react';

const AddHealthRecordModal = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    visitDate: '',
    time: '',
    duration: '',
    visitType: '',
    doctor: '',
    chiefComplaint: '',
    visitReason: '',
    fecalExamination: '',
    physicalExamination: '',
    weight: '',
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    treatmentMedication: '',
    diagnosisAssessment: '',
    additionalNotes: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    alert('Health record added successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className={`rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto ${
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
              Add Health Record
            </h3>
            <button 
              onClick={onClose}
              className={`text-2xl p-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Top Bar */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          } mb-6`}>
            {/* Form fields would go here - similar structure as before */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Visit Date
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange('visitDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">📅</span>
              </div>
            </div>
            {/* Add other form fields similarly */}
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
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;