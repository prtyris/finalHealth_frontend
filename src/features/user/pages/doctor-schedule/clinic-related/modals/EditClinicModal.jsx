import { useState } from "react";
import { useClinics } from "../../../../context/clinics/useClinics";

export default function EditClinicModal({ isOpen, onClose, clinicId }) {
  const { updateClinic, getClinicInfo } = useClinics();

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

    setLoading(true);
    await updateClinic(clinicId, payload);
    await getClinicInfo(clinicId);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blurred Blue Backdrop */}
      <div
        className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl border-4 border-blue-600 shadow-xl p-6 z-10 max-h-[90vh] overflow-y-auto overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-blue-700">
            Edit Clinic Information
          </h3>

          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm min-w-[600px]">
          <Input
            label="Clinic Name"
            onChange={(v) => handleChange("clinic_name", v)}
          />
          <Input
            label="Owner Name"
            onChange={(v) => handleChange("owner_name", v)}
          />
          <Input
            label="Business Permit #"
            onChange={(v) => handleChange("business_permit_no", v)}
          />
          <Input
            label="Contact Number 1"
            onChange={(v) => handleChange("contact_num", v)}
          />
          <Input
            label="contact Number 2"
            onChange={(v) => handleChange("backup_num", v)}
          />
          <Input
            label="Open Hours"
            onChange={(v) => handleChange("open_hours", v)}
          />
          <Input
            label="Open Days"
            onChange={(v) => handleChange("open_days", v)}
          />

          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              onChange={(e) => handleChange("address", e.target.value)}
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

/* ---------- Styled Input ---------- */

const Input = ({ label, onChange, type = "text" }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
