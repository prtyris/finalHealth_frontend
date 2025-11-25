import React, { useState } from "react";
import { rescheduleAppointment } from "../../../../../api/appointmentApi.js";
const RescheduleModal = ({
  isOpen,
  onClose,
  appointment,
  onRescheduleSuccess,
}) => {
  const [formData, setFormData] = useState({
    newDate: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pass both appointmentId and newDate to the reschedule function
      const res = await rescheduleAppointment(
        appointment.appointmentId,
        formData.newDate,
        appointment.appointmentType
      );

      if (res.success) {
        // Trigger success modal after successful reschedule
        onRescheduleSuccess(); // Trigger the success modal
        onClose(); // Close the modal after success
      } else {
        alert("Failed to reschedule appointment.");
      }
    } catch (error) {
      console.error("Error during rescheduling:", error);
      alert("Failed to reschedule appointment.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reschedule Appointment
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Appointment
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
              {appointment?.patientName || "N/A"} -{" "}
              {new Date(
                appointment?.appointmentDate || "N/A"
              ).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              - {appointment?.appointmentType || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Appointment Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={formData.newDate}
              onChange={(e) => handleInputChange("newDate", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;
