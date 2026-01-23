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
    // Remove empty fields
    const payload = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    await updateDoctorInfo(doctorId, payload);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Edit Doctor Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Input
            label="First Name"
            onChange={(v) => handleChange("f_name", v)}
          />
          <Input
            label="Middle Name"
            onChange={(v) => handleChange("m_name", v)}
          />
          <Input
            label="Last Name"
            onChange={(v) => handleChange("l_name", v)}
          />
          <Input
            label="Specialization"
            onChange={(v) => handleChange("specialization", v)}
          />
          <Input
            label="License Number"
            onChange={(v) => handleChange("license_number", v)}
          />
          <Input
            label="Years Experience"
            type="number"
            onChange={(v) => handleChange("years_experience", Number(v))}
          />
          <Input
            label="Education"
            onChange={(v) => handleChange("education", v)}
          />

          <Select
            label="Gender"
            onChange={(v) => handleChange("gender", v)}
            options={["Male", "Female"]}
          />

          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
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
    <label className="font-medium">{label}</label>
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

const Select = ({ label, onChange, options }) => (
  <div>
    <label className="font-medium">{label}</label>
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
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
