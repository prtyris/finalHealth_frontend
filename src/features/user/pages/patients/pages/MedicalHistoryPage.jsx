import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getMedicalHistory,
  addMedicalRecord,
  updateMedicalRecord,
} from "../../../../../api/medicalRecordApi"; // Import API calls
import MedicalHistoryModal from "../modal/MedicalHistoryModal"; // Modal to add/edit medical history
import Layout from "../../../components/Layout";

const MedicalHistoryPage = () => {
  const { patientId } = useParams(); // Get the patientId from URL params
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch medical history for the patient
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const res = await getMedicalHistory(patientId);
        if (res.success) {
          setMedicalHistory(res.medicalHistory || []); // Ensure it's always an array
        } else {
          console.error("Failed to fetch medical history:", res.error);
          setMedicalHistory([]); // Set empty array in case of error
        }
      } catch (error) {
        console.error("Error fetching medical history:", error);
        setMedicalHistory([]); // Set empty array on failure
      }
    };

    fetchMedicalHistory();
  }, [patientId]);

  // Open the modal to add new record or edit an existing record
  const openModal = (record = null) => {
    setSelectedRecord(record); // Set selected record if editing, or null for adding new
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Handle adding or updating medical records
  const handleSaveRecord = async (recordData) => {
    // Ensure we're using the correct field name: record_date
    const formattedRecordData = {
      ...recordData,
      record_date: recordData.record_date, // Make sure it's record_date
    };

    if (selectedRecord) {
      const res = await updateMedicalRecord(
        selectedRecord.record_id,
        formattedRecordData
      );
      if (res.success) {
        setMedicalHistory((prev) =>
          prev.map((record) =>
            record.record_id === selectedRecord.record_id
              ? res.updatedRecord
              : record
          )
        );
      }
    } else {
      const res = await addMedicalRecord(patientId, formattedRecordData);
      if (res.success) {
        setMedicalHistory((prev) => [...prev, res.newRecord]);
      }
    }

    closeModal();
  };

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-6 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Medical History
        </h2>
        {/* Add New Record Button */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => openModal()}
        >
          Add New Record
        </button>
        {/* Medical History records */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Record Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Diagnosis
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Treatment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Medications
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assessment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {medicalHistory.map((record) => (
                <tr key={record.record_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    {record.record_date
                      ? new Date(record.record_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm">{record.diagnosis}</td>
                  <td className="px-4 py-3 text-sm">{record.treatment}</td>
                  <td className="px-4 py-3 text-sm">{record.medications}</td>
                  <td className="px-4 py-3 text-sm">{record.assessment}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-xs"
                      onClick={() => openModal(record)} // Open modal for editing
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to add/edit medical history */}
      {isModalOpen && (
        <MedicalHistoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          patientId={patientId}
          record={selectedRecord}
          onSave={handleSaveRecord}
        />
      )}
    </Layout>
  );
};

export default MedicalHistoryPage;
