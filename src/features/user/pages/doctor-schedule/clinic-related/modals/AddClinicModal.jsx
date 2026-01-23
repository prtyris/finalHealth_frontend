import { useState } from "react";
import { useClinics } from "../../../../context/clinics/useClinics";

export default function AddClinicModal({ isOpen, onClose }) {
  const { createClinic, getAllClinicsOfUser } = useClinics();

  const [formData, setFormData] = useState({
    clinicName: "",
    businessPermitNo: "",
    ownerName: "",
    address: "",
    contactNum: "",
    backupNum: "",
    openHours: "",
    openDays: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await createClinic({
      clinicName: formData.clinicName,
      businessPermitNo: formData.businessPermitNo,
      ownerName: formData.ownerName,
      address: formData.address,
      contactNum: formData.contactNum,
      backupNum: formData.backupNum || null,
      openHours: formData.openHours,
      openDays: formData.openDays,
    });

    await getAllClinicsOfUser();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg p-6 z-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Clinic</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Input
            label="Clinic Name"
            value={formData.clinicName}
            onChange={(v) => handleChange("clinicName", v)}
          />

          <Input
            label="Business Permit No."
            value={formData.businessPermitNo}
            onChange={(v) => handleChange("businessPermitNo", v)}
          />

          <Input
            label="Owner Name"
            value={formData.ownerName}
            onChange={(v) => handleChange("ownerName", v)}
          />

          <Input
            label="Contact Number"
            value={formData.contactNum}
            onChange={(v) => handleChange("contactNum", v)}
          />

          <Input
            label="Backup Contact Number"
            value={formData.backupNum}
            onChange={(v) => handleChange("backupNum", v)}
          />

          <Input
            label="Open Hours (e.g. 9AM - 6PM)"
            value={formData.openHours}
            onChange={(v) => handleChange("openHours", v)}
          />

          <Input
            label="Open Days (e.g. Mon-Fri)"
            value={formData.openDays}
            onChange={(v) => handleChange("openDays", v)}
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
            disabled={
              !formData.clinicName ||
              !formData.businessPermitNo ||
              !formData.ownerName ||
              !formData.contactNum ||
              !formData.openHours ||
              !formData.openDays ||
              !formData.address
            }
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            Save Clinic
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

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
