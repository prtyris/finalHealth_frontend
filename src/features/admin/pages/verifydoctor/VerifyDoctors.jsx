import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import VerifyDoctorsModal from "./modal/VerifyDoctorsModal";
import AdminLayout from "../../components/AdminLayout";
import { getVerificationList } from "../../../../api/adminApi";

export default function VerifyDoctors() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  // LOAD DOCTORS + CLINICS
  useEffect(() => {
    async function load() {
      const res = await getVerificationList();
      if (res.success) setItems(res.data);
    }
    load();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-gray-50">
        <Header title="Verification" />

        <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
          <h2 className="text-3xl font-bold mb-6">
            Doctor & Clinic Verification
          </h2>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 gap-2"
              >
                <div
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => openModal(item)}
                >
                  {item.type === "doctor" ? `Dr. ${item.name}` : item.name} –{" "}
                  {item.address}
                </div>

                <button
                  className="bg-[#2133ff] text-white px-6 py-2 rounded-xl hover:bg-blue-700 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  Verify
                </button>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <VerifyDoctorsModal
            doctor={selectedItem}
            onClose={() => setIsModalOpen(false)}
            onApprove={() => setIsModalOpen(false)}
            onReject={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
