import { useState, useEffect } from "react";
import { usePatients } from "../../../context/patients/usePatients";
import { useMedicalRecords } from "../../../context/medical-records/useMedicalRecords";

export default function EditPatientModal({
  isOpen,
  onClose,
  patientId,
  patient,
}) {
  const { updatePatientInfo } = usePatients();
  const { getPatientInfo } = useMedicalRecords();

  const [form, setForm] = useState({});

  useEffect(() => {
    if (!isOpen || !patient) return;

    setForm({
      f_name: patient.f_name || "",
      m_name: patient.m_name || "",
      l_name: patient.l_name || "",
      gender: patient.gender || "",
      contact_number: patient.contact_number || "",
      backup_contact: patient.backup_contact || "",
      email: patient.email || "",
      address: patient.address || "",
      priority_id: patient.priority_id || "",
    });
  }, [isOpen, patient]);

  if (!isOpen) return null;

  const PRIORITIES = [
    { id: 1, label: "Normal" },
    { id: 2, label: "Senior Citizen" },
    { id: 3, label: "PWD" },
    { id: 4, label: "Emergency" },
    { id: 5, label: "Follow-up" },
  ];

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!patientId) return;

    const success = await updatePatientInfo(patientId, form);

    if (success) {
      await getPatientInfo(patientId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-2xl border-4 border-blue-600 shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto z-10">

        <h3 className="text-xl font-semibold text-blue-700 text-center">
          Update Patient
        </h3>

        <Input
          label="First Name"
          value={form.f_name || ""}
          onChange={(v) => handleChange("f_name", v)}
        />

        <Input
          label="Middle Name"
          value={form.m_name || ""}
          onChange={(v) => handleChange("m_name", v)}
        />

        <Input
          label="Last Name"
          value={form.l_name || ""}
          onChange={(v) => handleChange("l_name", v)}
        />

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={form.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <Input
          label="Contact Number"
          value={form.contact_number || ""}
          onChange={(v) => handleChange("contact_number", v)}
        />

        <Input
          label="Backup Contact"
          value={form.backup_contact || ""}
          onChange={(v) => handleChange("backup_contact", v)}
        />

        <Input
          label="Email"
          value={form.email || ""}
          onChange={(v) => handleChange("email", v)}
        />

        <Input
          label="Address"
          value={form.address || ""}
          onChange={(v) => handleChange("address", v)}
        />

        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            value={form.priority_id || ""}
            onChange={(e) =>
              handleChange("priority_id", Number(e.target.value))
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select priority</option>
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={value}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={(e) => onChange(e.target.value.trim())}
      />
    </div>
  );
}
