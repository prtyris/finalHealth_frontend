import React, { useState, useEffect } from "react";

const MedicalHistoryModal = ({
  isOpen,
  onClose,
  patientId,
  record,
  onSave,
}) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [assessment, setAssessment] = useState("");
  const [medications, setMedications] = useState("");
  const [notes, setNotes] = useState("");
  const [recordDate, setRecordDate] = useState(""); // Handle record date input

  // Set initial values for editing or creating a record, including formatDate
  useEffect(() => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toISOString().slice(0, 10); // Convert to YYYY-MM-DD format
    };

    if (record) {
      setDiagnosis(record.diagnosis || "");
      setTreatment(record.treatment || "");
      setAssessment(record.assessment || "");
      setMedications(record.medications || "");
      setNotes(record.notes || "");

      // Ensure the record_date is a valid value before formatting
      if (record.record_date) {
        setRecordDate(formatDate(record.record_date)); // Format date if available
      }
    }
  }, [record]); // Only run this effect if `record` changes

  // Handle save
  const handleSave = () => {
    console.log("Record Date:", recordDate); // Log the recordDate for debugging

    const recordData = {
      diagnosis,
      treatment,
      assessment,
      medications,
      notes,
      record_date: recordDate, // Corrected to use `record_date` instead of `recordDate`
    };

    // Validate record_date format (YYYY-MM-DD)
    if (recordDate && !/^(\d{4})-(\d{2})-(\d{2})$/.test(recordDate)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    // Trigger the onSave function passed as a prop
    onSave(recordData);
  };

  // If modal is closed, return null to hide the modal
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 overflow-scroll">
        <h3 className="text-lg font-semibold mb-4">
          {record ? "Edit Medical History" : "Add Medical History"}
        </h3>
        <div className="space-y-4">
          {/* Diagnosis Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Treatment Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Treatment
            </label>
            <input
              type="text"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Assessment Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assessment
            </label>
            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Medications Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medications
            </label>
            <textarea
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Notes Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Record Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Record Date
            </label>
            <input
              type="date"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryModal;
