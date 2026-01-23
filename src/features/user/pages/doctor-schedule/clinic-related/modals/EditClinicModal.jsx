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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          Edit Clinic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
            label="Contact Number"
            onChange={(v) => handleChange("contact_num", v)}
          />
          <Input
            label="Backup Number"
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
