import { useState } from "react";
import { usePatients } from "../../../context/patients/usePatients";
import { useMedicalRecords } from "../../../context/medical-records/useMedicalRecords";

export default function EditPatientModal({ isOpen, onClose, patientId }) {
  const { updatePatientInfo } = usePatients();
  const { getPatientInfo } = useMedicalRecords();

  const [form, setForm] = useState({});

  if (!isOpen) return null;

  const PRIORITIES = [
    { id: 1, label: "Normal" },
    { id: 2, label: "Senior Citizen" },
    { id: 3, label: "PWD" },
    { id: 4, label: "Emergency" },
    { id: 5, label: "Follow-up" },
  ];

  const handleChange = (key, value) => {
    if (value === "" || value === null || value === undefined) return;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(form).length === 0) {
      alert("No changes provided");
      return;
    }

    const success = await updatePatientInfo(patientId, form);

    if (success) {
      await getPatientInfo(patientId);
      setForm({});
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold">Update Patient</h3>

        <Input label="First Name" onChange={(v) => handleChange("f_name", v)} />
        <Input
          label="Middle Name"
          onChange={(v) => handleChange("m_name", v)}
        />
        <Input label="Last Name" onChange={(v) => handleChange("l_name", v)} />

        <div>
          <label className="text-sm font-medium">Gender</label>
          <select
            className="w-full border rounded px-3 py-2"
            defaultValue=""
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <Input
          label="Contact Number"
          onChange={(v) => handleChange("contact_number", v)}
        />
        <Input
          label="Backup Contact"
          onChange={(v) => handleChange("backup_contact", v)}
        />
        <Input label="Email" onChange={(v) => handleChange("email", v)} />
        <Input label="Address" onChange={(v) => handleChange("address", v)} />

        <div>
          <label className="text-sm font-medium">Priority</label>
          <select
            className="w-full border rounded px-3 py-2"
            defaultValue=""
            onChange={(e) =>
              handleChange("priority_id", Number(e.target.value))
            }
          >
            <option value="">Select priority</option>
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        className="w-full border rounded px-3 py-2"
        placeholder={`Enter ${label.toLowerCase()}`}
        onChange={(e) => onChange(e.target.value.trim())}
      />
    </div>
  );
}
