import React, { useState } from "react";

const AddSessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  darkMode,
  affiliatedClinics,
}) => {
  const [formData, setFormData] = useState({
    clinicId: "",
    dayOfWeek: "Monday",
    startTime: "",
    endTime: "",
  });

  if (!isOpen) return null;
  console.log(affiliatedClinics);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPayload = {
      clinicId: Number(formData.clinicId),
      dayOfWeek: formData.dayOfWeek,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    onSubmit(finalPayload);

    setFormData({
      clinicId: "",
      dayOfWeek: "Monday",
      startTime: "",
      endTime: "",
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
              Add Doctor Session
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
          {/* SELECT CLINIC */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Clinic
            </label>

            <select
              value={formData.clinicId}
              onChange={(e) => handleInputChange("clinicId", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            >
              <option value="">Select Clinic</option>

              {affiliatedClinics?.map((c) => (
                <option key={c.id} value={c.id}>
                  {`${c.name} (${c.openDays} : ${c.openHours})`}
                </option>
              ))}
            </select>
          </div>

          {/* DAY OF WEEK */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Day of Week
            </label>

            <select
              value={formData.dayOfWeek}
              onChange={(e) => handleInputChange("dayOfWeek", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* START TIME */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              Start Time
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          {/* END TIME */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              End Time
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
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
              Save Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
