import React from 'react';

const ScheduleListView = ({ darkMode, doctors, onAddDoctor, onManageDoctor }) => {
  return (
    <div className={`rounded-xl p-6 shadow-sm border ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Doctor Schedule
        </h1>
        <button 
          onClick={onAddDoctor}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          + Add Doctor
        </button>
      </div>
      
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Doctor Schedule
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`text-left py-3 px-4 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Doctor Name</th>
              <th className={`text-left py-3 px-4 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Specialization</th>
              <th className={`text-left py-3 px-4 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>License</th>
              <th className={`text-left py-3 px-4 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Contact</th>
              <th className={`text-left py-3 px-4 text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor.id} className={`border-b ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <td className={`py-3 px-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {doctor.name}
                </td>
                <td className={`py-3 px-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {doctor.specialization}
                </td>
                <td className={`py-3 px-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {doctor.license}
                </td>
                <td className={`py-3 px-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {doctor.contact}
                </td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => onManageDoctor(doctor)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleListView;