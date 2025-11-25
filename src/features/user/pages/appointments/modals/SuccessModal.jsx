import React from "react";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-green-200 dark:bg-green-700 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Appointment Rescheduled Successfully!
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-gray-900 dark:text-white">
            The appointment has been successfully rescheduled.
          </p>
        </div>
        <div className="flex justify-center pb-6">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
