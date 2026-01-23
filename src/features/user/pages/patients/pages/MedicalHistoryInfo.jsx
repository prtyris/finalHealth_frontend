import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useMedicalRecords } from "../../../context/medical-records/useMedicalRecords";
import { resolveImageUrl } from "../../../../../utils/resolveImageUrl";

export default function MedicalHistoryInfo() {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const { getMedicalRecordsFullDetails, medicalRecordsFullDetails } =
    useMedicalRecords();

  useEffect(() => {
    getMedicalRecordsFullDetails(recordId);
  }, [recordId]);

  // ✅ HARD GUARD — MUST COME BEFORE DESTRUCTURING
  if (!medicalRecordsFullDetails) {
    return (
      <Layout>
        <div className="p-6">Loading medical record...</div>
      </Layout>
    );
  }

  const {
    medicalRecord,
    vitalSigns = [],
    prescriptions = [],
    labResults = [],
    referrals = [],
    followups = [],
    certificates = [],
    documents = [], // 🔥 REQUIRED
  } = medicalRecordsFullDetails;

  // OPTIONAL: extra safety
  if (!medicalRecord) {
    return (
      <Layout>
        <div className="p-6">Medical record not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Medical Record #{medicalRecord?.record_id}
          </h2>
        </div>

        {/* Visit Info */}
        <Section title="Visit Information">
          <Info label="Date" value={medicalRecord?.record_date} />
          <Info label="Doctor" value={medicalRecord?.doctor_name} />
          <Info label="Clinic" value={medicalRecord?.clinic_name} />
          <Info label="Assessment" value={medicalRecord?.assessment} />
        </Section>

        {/* Diagnosis */}
        <Section title="Diagnosis">
          <Info label="Diagnosis" value={medicalRecord?.diagnosis} />
          <Info label="Treatment" value={medicalRecord?.treatment} />
          <Info label="Medications" value={medicalRecord?.medications} />
        </Section>

        {/* Vital Signs */}
        {vitalSigns.length > 0 && (
          <Section title="Vital Signs">
            {vitalSigns.map((v) => (
              <div key={v.vital_id}>
                <Info label="Blood Pressure" value={v.blood_pressure} />
                <Info label="Heart Rate" value={v.heart_rate} />
                <Info label="Temperature" value={`${v.temperature} °C`} />
                <Info
                  label="Oxygen Saturation"
                  value={`${v.oxygen_saturation}%`}
                />
                <Info label="Weight" value={`${v.weight} kg`} />
                {v.vital_img_path && <ImagePreview src={v.vital_img_path} />}
              </div>
            ))}
          </Section>
        )}

        {/* Prescriptions */}
        {prescriptions.length > 0 && (
          <Section title="Prescriptions">
            {prescriptions.map((p) => (
              <div key={p.prescription_id}>
                <Info label="Medication" value={p.medication_name} />
                <Info label="Dosage" value={p.dosage} />
                <Info label="Frequency" value={p.frequency} />
                <Info label="Duration" value={p.duration} />
                {p.prescription_img_path && (
                  <ImagePreview src={p.prescription_img_path} />
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Lab Results */}
        {labResults.length > 0 && (
          <Section title="Lab Results">
            {labResults.map((l) => (
              <div key={l.result_id}>
                <Info label="Test" value={l.test_type} />
                <Info label="Result" value={l.result} />
                <Info label="Interpretation" value={l.interpretation} />
                {l.lab_img_path && <ImagePreview src={l.lab_img_path} />}
              </div>
            ))}
          </Section>
        )}

        {/* Referrals */}
        {referrals.length > 0 && (
          <Section title="Referrals">
            {referrals.map((r) => (
              <div key={r.referral_id}>
                <Info label="Referred To" value={r.referred_to} />
                <Info label="Reason" value={r.reason} />
                {r.referral_img_path && (
                  <ImagePreview src={r.referral_img_path} />
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Follow-ups */}
        {followups.length > 0 && (
          <Section title="Follow-up Notes">
            {followups.map((f) => (
              <div key={f.followup_id}>
                <Info label="Follow-up Date" value={f.followup_date} />
                <Info label="Notes" value={f.notes} />
                {f.followup_img_path && (
                  <ImagePreview src={f.followup_img_path} />
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <Section title="Certificates">
            {certificates.map((c) => (
              <div key={c.certificates_id}>
                <Info label="Type" value={c.certificate_type} />
                <Info label="Remarks" value={c.remarks} />
                {c.certificates_img_path && (
                  <ImagePreview src={c.certificates_img_path} />
                )}
              </div>
            ))}
          </Section>
        )}

        {documents.length > 0 && (
          <Section title="Medical Record Documents">
            {documents.map((d) => (
              <div key={d.document_id}>
                <ImagePreview src={d.document_img_path} />
              </div>
            ))}
          </Section>
        )}
      </div>
    </Layout>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="text-sm">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}

function ImagePreview({ src }) {
  const resolvedSrc = resolveImageUrl(src);
  if (!resolvedSrc) return null;

  return (
    <div className="mt-3">
      <img
        src={resolvedSrc}
        alt="medical document"
        className="w-32 h-32 object-cover rounded border cursor-pointer hover:opacity-90"
        onClick={() => window.open(resolvedSrc, "_blank")}
      />
      <p className="text-xs text-gray-500 mt-1">Click to view</p>
    </div>
  );
}
