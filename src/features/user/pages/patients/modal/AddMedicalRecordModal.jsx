import { useState } from "react";
import { useMedicalRecords } from "../../../context/medical-records/useMedicalRecords";

export default function AddMedicalRecordModal({ isOpen, onClose, patientId }) {
  const {
    createMedicalRecord,
    uploadMedicalRecordDocument,
    getPatientMedRecord,
  } = useMedicalRecords();
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [form, setForm] = useState({
    record_date: "",
    diagnosis: "",
    treatment: "",
    medications: "",
    assessment: "",

    blood_pressure: "",
    heart_rate: "",
    temperature: "",
    oxygen_saturation: "",
    weight: "",

    medication_name: "",
    dosage: "",
    frequency: "",
    duration: "",

    test_type: "",
    result: "",
    interpretation: "",

    referred_to: "",
    reason: "",

    followup_date: "",
    notes: "",

    certificate_type: "",
    remarks: "",
  });

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.diagnosis) {
      alert("Diagnosis is required");
      return;
    }

    const doctorId = localStorage.getItem("selectedDoctorIdPatientPage");
    const clinicId = localStorage.getItem("selectedClinicIdPatientPage");

    const payload = {
      ...form,
      doctor_id: Number(doctorId),
      clinic_id: Number(clinicId),
    };

    // 1️⃣ CREATE RECORD (JSON)
    const record = await createMedicalRecord(patientId, payload);

    // record.record_id must be returned by backend
    const recordId = record.recordId;
    console.log(recordId);

    // 2️⃣ UPLOAD IMAGES (multipart)
    for (const file of selectedFiles) {
      await uploadMedicalRecordDocument(recordId, file);
    }

    await getPatientMedRecord(patientId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl rounded p-6 space-y-6 overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-semibold">Add Medical Record</h3>

        <Section title="Visit Information">
          <Input
            label="Record Date"
            type="date"
            onChange={(v) => handleChange("record_date", v)}
          />
          <Input
            label="Assessment"
            onChange={(v) => handleChange("assessment", v)}
          />
        </Section>

        <Section title="Diagnosis">
          <Input
            label="Diagnosis"
            onChange={(v) => handleChange("diagnosis", v)}
          />
          <Input
            label="Treatment"
            onChange={(v) => handleChange("treatment", v)}
          />
          <Input
            label="Medications"
            onChange={(v) => handleChange("medications", v)}
          />
        </Section>

        <Section title="Medical Record Images">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
            className="w-full border rounded px-3 py-2"
          />
        </Section>

        <Section title="Vital Signs">
          <Input
            label="Blood Pressure"
            onChange={(v) => handleChange("blood_pressure", v)}
          />
          <Input
            label="Heart Rate"
            onChange={(v) => handleChange("heart_rate", v)}
          />
          <Input
            label="Temperature (°C)"
            onChange={(v) => handleChange("temperature", v)}
          />
          <Input
            label="Oxygen Saturation (%)"
            onChange={(v) => handleChange("oxygen_saturation", v)}
          />
          <Input
            label="Weight (kg)"
            onChange={(v) => handleChange("weight", v)}
          />
        </Section>

        <Section title="Prescription">
          <Input
            label="Medication Name"
            onChange={(v) => handleChange("medication_name", v)}
          />
          <Input label="Dosage" onChange={(v) => handleChange("dosage", v)} />
          <Input
            label="Frequency"
            onChange={(v) => handleChange("frequency", v)}
          />
          <Input
            label="Duration"
            onChange={(v) => handleChange("duration", v)}
          />
        </Section>

        <Section title="Lab Result">
          <Input
            label="Test Type"
            onChange={(v) => handleChange("test_type", v)}
          />
          <Input label="Result" onChange={(v) => handleChange("result", v)} />
          <Input
            label="Interpretation"
            onChange={(v) => handleChange("interpretation", v)}
          />
        </Section>

        <Section title="Referral">
          <Input
            label="Referred To"
            onChange={(v) => handleChange("referred_to", v)}
          />
          <Input label="Reason" onChange={(v) => handleChange("reason", v)} />
        </Section>

        <Section title="Follow-up">
          <Input
            label="Follow-up Date"
            type="date"
            onChange={(v) => handleChange("followup_date", v)}
          />
          <Input label="Notes" onChange={(v) => handleChange("notes", v)} />
        </Section>

        <Section title="Certificate">
          <Input
            label="Certificate Type"
            onChange={(v) => handleChange("certificate_type", v)}
          />
          <Input label="Remarks" onChange={(v) => handleChange("remarks", v)} />
        </Section>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- small components ---------- */

function Section({ title, children }) {
  return (
    <div className="border rounded p-4 space-y-3">
      <h4 className="font-semibold text-blue-600">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Input({ label, type = "text", onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        className="w-full border rounded px-3 py-2"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
