// VerifyDoctors.jsx
import React, { useState } from "react";
import Header from "../../components/Header";
import VerifyDoctorsModal from "./modal/VerifyDoctorsModal";

export default function VerifyDoctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      name: "Dr. Michael Cruz",
      clinic: "Davao Clinic",
      license: "D-123456678",
      contact: "+63 962 3764 8726",
      status: "Pending",
    },
    {
      name: "CityHealth Clinic",
      clinic: "CityHealth Clinic",
      license: "C-987654321",
      contact: "+63 912 3456 789",
      status: "Pending",
    },
  ];

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Header title="Verification" />

      <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
        <h2 className="text-3xl font-bold mb-6">Doctor & Clinic Verification</h2>

        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 gap-2"
            >
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => openModal(doctor)}
              >
                {doctor.name} – {doctor.clinic}
              </div>

              <button
                className="bg-[#2133ff] text-white px-6 py-2 rounded-xl hover:bg-blue-700 cursor-pointer"
                onClick={() => openModal(doctor)}
              >
                Verify
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <VerifyDoctorsModal
          doctor={selectedDoctor}
          onClose={closeModal}
          onApprove={closeModal}
          onReject={closeModal}
        />
      )}
    </div>
  );
}
