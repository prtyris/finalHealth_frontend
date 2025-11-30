import React, { useState } from "react";

const MedicalHistoryModal = ({ isOpen, onClose, patient, medicalHistory }) => {
  const [newRecord, setNewRecord] = useState("");

  // Handle adding a new medical record
  const handleAddRecord = async () => {
    // Add the logic to add a new record (e.g., API call to backend)
    // You can also add validation here

    console.log("Adding new record: ", newRecord);
    setNewRecord(""); // Reset input after adding
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h3 className="text-xl font-semibold mb-4">
            Medical History for {patient.customerName}
          </h3>

          {/* Display medical records */}
          <div>
            <h4 className="text-lg font-medium">Existing Records</h4>
            <ul className="list-disc pl-5">
              {medicalHistory.map((record, index) => (
                <li key={index}>{record.diagnosis}</li> // You can display more details here
              ))}
            </ul>
          </div>

          {/* Input to add new record */}
          <div className="mt-4">
            <textarea
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
              placeholder="Add a new medical record..."
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddRecord}
            >
              Add Record
            </button>
            <button
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MedicalHistoryModal;
