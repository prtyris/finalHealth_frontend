import { useState } from "react";

import { usePatients } from "../../../context/patients/usePatients";
export default function RegisterPatientModal({ isOpen, onClose }) {
  const { createPatient } = usePatients();

  const [formData, setFormData] = useState({
    fName: "Maria",
    mName: "Santos",
    lName: "Reyes",
    gender: "Female",
    dateOfBirth: "1998-05-20",
    contactNumber: "09123456789",
    backupContact: "09998887777",
    email: "maria.reyes@gmail.com",
    address: "Blk 12 Lot 3 Fairview, Quezon City",
    patientTypeId: 1, // Normal
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const doctorId = Number(localStorage.getItem("selectedDoctorId"));
    const clinicId = Number(localStorage.getItem("selectedClinicId"));

    const payload = {
      fName: formData.fName,
      mName: formData.mName,
      lName: formData.lName,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      contactNumber: formData.contactNumber,
      backupContact: formData.backupContact,
      email: formData.email,
      address: formData.address,
      priorityId: formData.patientTypeId,
      doctorId: doctorId,
      clinicId: clinicId,
    };

    await createPatient(payload);

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Register New Patient
        </h2>

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

          <Select
            label="Gender"
            value={formData.gender}
            onChange={(v) => handleChange("gender", v)}
            options={["Male", "Female"]}
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(v) => handleChange("dateOfBirth", v)}
          />

          <Input
            label="Contact Number"
            value={formData.contactNumber}
            onChange={(v) => handleChange("contactNumber", v)}
          />

          <Input
            label="Backup Contact"
            value={formData.backupContact}
            onChange={(v) => handleChange("backupContact", v)}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(v) => handleChange("email", v)}
          />

          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <Select
            label="Patient Type"
            value={formData.patientTypeId}
            onChange={(v) => handleChange("patientTypeId", Number(v))}
            options={[
              { label: "Normal", value: 1 },
              { label: "Senior Citizen", value: 2 },
              { label: "PWD", value: 3 },
              { label: "Emergency", value: 4 },
              { label: "Follow-up", value: 5 },
            ]}
          />
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
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Register Patient"}
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
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )
      )}
    </select>
  </div>
);
