import React, { useState } from "react";

const AddClinicModal = ({ isOpen, onClose, onSubmit, darkMode }) => {
  const [formData, setFormData] = useState({
    clinicName: "",
    address: "",
    contactNum: "",
    backupNum: "",
    openingTime: "",
    closingTime: "",
    openDays: "",
    businessPermitNo: "",
    ownerName: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPayload = {
      clinicName: formData.clinicName,
      address: formData.address,
      contactNum: formData.contactNum,
      backupNum: formData.backupNum,
      openHours: `${formData.openingTime} - ${formData.closingTime}`,
      openDays: formData.openDays,
      businessPermitNo: formData.businessPermitNo,
      ownerName: formData.ownerName,
    };

    onSubmit(finalPayload);

    // Reset form
    setFormData({
      clinicName: "",
      address: "",
      contactNum: "",
      backupNum: "",
      openingTime: "",
      closingTime: "",
      openDays: "",
      businessPermitNo: "",
      ownerName: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* HEADER */}
        <div
          className={`p-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Add Clinic
            </h3>
            <button
              onClick={onClose}
              className={`text-2xl ${
                darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              } transition-colors`}
            >
              ×
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Clinic Name */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Clinic Name
            </label>
            <input
              type="text"
              placeholder="Enter clinic name"
              value={formData.clinicName}
              onChange={(e) => handleInputChange("clinicName", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Opening Time */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Opening Time
            </label>
            <input
              type="time"
              value={formData.openingTime}
              onChange={(e) => handleInputChange("openingTime", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          {/* Closing Time */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Closing Time
            </label>
            <input
              type="time"
              value={formData.closingTime}
              onChange={(e) => handleInputChange("closingTime", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          {/* Open Days */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Open Days
            </label>
            <input
              type="text"
              placeholder="e.g. Mon-Fri"
              value={formData.openDays}
              onChange={(e) => handleInputChange("openDays", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 0917 123 4567"
              value={formData.contactNum}
              onChange={(e) => handleInputChange("contactNum", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Backup Number */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Backup Contact Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 0998 888 7777"
              value={formData.backupNum}
              onChange={(e) => handleInputChange("backupNum", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Business Permit Number */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Business Permit Number
            </label>
            <input
              type="text"
              placeholder="Enter permit number"
              value={formData.businessPermitNo}
              onChange={(e) =>
                handleInputChange("businessPermitNo", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* Owner Name */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Owner Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Santos"
              value={formData.ownerName}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Save Clinic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClinicModal;
