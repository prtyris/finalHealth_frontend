import { useState } from "react";

import { useClinics } from "../../../../context/clinics/useClinics";

export default function CreateClinicSessionModal({
  isOpen,
  onClose,
  clinicId,
}) {
  const { createClinicSession, getClinicSessions } = useClinics();

  const [formData, setFormData] = useState({
    day_of_week: "",
    open_time: "",
    close_time: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // UI only for now
    console.log("Clinic session data:", formData);
    await createClinicSession(clinicId, formData);
    await getClinicSessions(clinicId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-700">
            Add Clinic Session
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* ================= FORM ================= */}
        <div className="space-y-4 text-sm">
          {/* Day */}
          <div>
            <label className="block font-medium mb-1">Day</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={formData.day_of_week}
              onChange={(e) => handleChange("day_of_week", e.target.value)}
            >
              <option value="">Select day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          {/* Open Time */}
          <div>
            <label className="block font-medium mb-1">Open Time</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={formData.open_time}
              onChange={(e) => handleChange("open_time", e.target.value)}
            />
          </div>

          {/* Close Time */}
          <div>
            <label className="block font-medium mb-1">Close Time</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2"
              value={formData.close_time}
              onChange={(e) => handleChange("close_time", e.target.value)}
            />
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 text-sm rounded border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Save Session
          </button>
        </div>
      </div>
    </div>
  );
}
