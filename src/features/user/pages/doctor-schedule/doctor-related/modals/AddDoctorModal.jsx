import { useState } from "react";

import { useDoctors } from "../../../../context/doctors/useDoctors";

export default function AddDoctorModal({ isOpen, onClose }) {
  const { createDoctor } = useDoctors();
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    specialization: "",
    licenseNumber: "",
    yearsExperience: "",
    education: "",
    gender: "Male",
    address: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await createDoctor({
      fName: formData.fName,
      mName: formData.mName || null,
      lName: formData.lName,
      specialization: formData.specialization,
      licenseNumber: formData.licenseNumber,
      yearsExperience: Number(formData.yearsExperience) || 0,
      education: formData.education,
      gender: formData.gender,
      address: formData.address,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg p-6 z-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Doctor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Input
            label="First Name"
            value={formData.fName}
            onChange={(v) => handleChange("fName", v)}
          />
          <Input
            label="Middle Name"
            value={formData.mName}
            onChange={(v) => handleChange("mName", v)}
          />
          <Input
            label="Last Name"
            value={formData.lName}
            onChange={(v) => handleChange("lName", v)}
          />

          <Input
            label="Specialization"
            value={formData.specialization}
            onChange={(v) => handleChange("specialization", v)}
          />
          <Input
            label="License Number"
            value={formData.licenseNumber}
            onChange={(v) => handleChange("licenseNumber", v)}
          />

          <Input
            label="Years of Experience"
            type="number"
            value={formData.yearsExperience}
            onChange={(v) => handleChange("yearsExperience", v)}
          />

          <Input
            label="Education"
            value={formData.education}
            onChange={(v) => handleChange("education", v)}
          />

          <Select
            label="Gender"
            value={formData.gender}
            onChange={(v) => handleChange("gender", v)}
            options={["Male", "Female"]}
          />

          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Inputs */
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
