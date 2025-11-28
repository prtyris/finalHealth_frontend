import React, { useState } from "react";
import { registerDoctor } from "../../../../../../api/doctorApi";
import AlertModal from "../../../../../../components/AlertModal";

const AddDoctorModal = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    specialization: "",
    licenseNumber: "",
    yearsExperience: "",
    education: "",
    gender: "",
    address: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fName: formData.fName,
        mName: formData.mName,
        lName: formData.lName,
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        yearsExperience: Number(formData.yearsExperience),
        education: formData.education,
        gender: formData.gender,
        address: formData.address,
      };

      const result = await registerDoctor(payload);

      // Backend returned success → show modal
      setAlert({
        show: true,
        type: "success",
        message: "Doctor successfully added!",
        onClose: () => window.location.reload(), // refresh ONLY when closed
      });
    } catch (err) {
      console.error("Doctor creation failed:", err);

      // Error → show modal but DO NOT refresh
      setAlert({
        show: true,
        type: "failed",
        message: err.message || "Failed to add doctor",
        onClose: () => setAlert({ show: false, message: "" }),
      });
    }
  };

  return (
    <>
      {/* Alert Modal */}
      {alert.show && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}

      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div
          className={`rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
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
                Add Doctor
              </h3>
              <button
                onClick={onClose}
                className={`text-2xl ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* FIRST NAME */}
            <InputField
              label="First Name"
              field="fName"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* MIDDLE NAME */}
            <InputField
              label="Middle Name"
              field="mName"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* LAST NAME */}
            <InputField
              label="Last Name"
              field="lName"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* SPECIALIZATION */}
            <InputField
              label="Specialization"
              field="specialization"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* LICENSE NUMBER */}
            <InputField
              label="License Number"
              field="licenseNumber"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* YEARS EXPERIENCE */}
            <InputField
              label="Years of Experience"
              field="yearsExperience"
              type="number"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* EDUCATION */}
            <InputField
              label="Education"
              field="education"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* GENDER */}
            <InputField
              label="Gender"
              field="gender"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* ADDRESS */}
            <InputField
              label="Address"
              field="address"
              darkMode={darkMode}
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// ⭐ Reusable input component
const InputField = ({
  label,
  field,
  type = "text",
  formData,
  darkMode,
  handleInputChange,
}) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${
        darkMode ? "text-gray-400" : "text-gray-700"
      }`}
    >
      {label}
    </label>

    <input
      type={type}
      value={formData[field]}
      onChange={(e) => handleInputChange(field, e.target.value)}
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      }`}
    />
  </div>
);

export default AddDoctorModal;
