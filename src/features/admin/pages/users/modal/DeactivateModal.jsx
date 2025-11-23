
import React from "react";

export default function DeactivateModal({ isOpen, onClose, onConfirm, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[380px] rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-3">Deactivate User</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to deactivate <span className="font-semibold">{user}</span>?  
          This user will no longer be able to access the system.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-xl cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}
