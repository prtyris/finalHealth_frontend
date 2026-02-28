import { useState } from "react";
import { useDoctors } from "../../../../context/doctors/useDoctors";

export default function EditDoctorModal({ isOpen, onClose, doctorId }) {
  const { updateDoctorInfo } = useDoctors();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    await updateDoctorInfo(doctorId, payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blurred Blue Backdrop */}
      <div
        className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl border-4 border-blue-600 shadow-xl p-6 z-10 max-h-[90vh] overflow-y-auto overflow-x-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-700">
            Edit Doctor Information
          </h2>

          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm min-w-[700px]">

          <Input label="First Name" onChange={(v) => handleChange("f_name", v)} />
          <Input label="Middle Name" onChange={(v) => handleChange("m_name", v)} />
          <Input label="Last Name" onChange={(v) => handleChange("l_name", v)} />
          <Input label="Specialization" onChange={(v) => handleChange("specialization", v)} />
          <Input label="License Number" onChange={(v) => handleChange("license_number", v)} />
          <Input
            label="Years Experience"
            type="number"
            onChange={(v) => handleChange("years_experience", Number(v))}
          />
          <Input label="Education" onChange={(v) => handleChange("education", v)} />

          <Select
            label="Gender"
            onChange={(v) => handleChange("gender", v)}
            options={["Male", "Female"]}
          />

          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inputs ---------- */

const Input = ({ label, onChange, type = "text" }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, onChange, options }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
