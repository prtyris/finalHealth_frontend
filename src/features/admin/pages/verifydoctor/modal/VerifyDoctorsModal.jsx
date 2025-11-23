// VerifyDoctorsModal.jsx
import React from "react";

export default function VerifyDoctorsModal({
  doctor,
  onClose,
  onApprove,
  onReject,
}) {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-gray-300 bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl relative z-10">
        <div className="bg-[#2133ff] text-white rounded-t-2xl p-4">
          <h2 className="text-xl md:text-2xl font-bold">Doctor Information</h2>
        </div>

        <div className="p-6 space-y-4">
          <div><strong>Name:</strong> {doctor.name}</div>
          <div><strong>License Number:</strong> {doctor.license}</div>
          <div><strong>Contact No.:</strong> {doctor.contact}</div>
          <div><strong>Status:</strong> {doctor.status}</div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onReject}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Reject
            </button>
            <button
              onClick={onApprove}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Approve
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
