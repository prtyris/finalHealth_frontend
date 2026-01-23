import { useState, useEffect } from "react";

import { useClinics } from "../../../../context/clinics/useClinics";
import { useDoctorSessions } from "../../../../context/doctor-sessions/useDoctorSessions";

export default function CreateDoctorSessionModal({
  isOpen,
  onClose,
  doctorId,
}) {
  const {
    clinics,
    clinicSessions,
    loading,
    getAllClinicsOfDoctor,
    getClinicSessions,
  } = useClinics();

  const { getAllDoctorSessions, createDoctorSession } = useDoctorSessions();

  const [clinicId, setClinicId] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Fetch clinics ONCE when modal opens
  useEffect(() => {
    getAllClinicsOfDoctor(Number(doctorId));
  }, []);

  if (!isOpen) return null;

  /* ================= HANDLERS ================= */

  const handleClinicChange = async (value) => {
    const id = Number(value);
    setClinicId(id);
    setSelectedSchedule(null);
    await getClinicSessions(id);
  };

  const handleSubmit = async () => {
    if (!selectedSchedule) return;

    // This is what you'll later send to backend
    const payload = {
      doctorId,
      clinicId,
      // clinicScheduleId: selectedSchedule.clinic_schedule_id,
      dayOfWeek: selectedSchedule.day_of_week,
      startTime: selectedSchedule.open_time,
      endTime: selectedSchedule.close_time,
    };

    await createDoctorSession(payload);
    await getAllDoctorSessions(doctorId);

    onClose();
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onMouseDown={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white w-full max-w-2xl mx-4 rounded-xl shadow-lg p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Add Doctor Session
        </h2>

        <div className="grid grid-cols-1 gap-4 text-sm">
          {/* Clinic Selector */}
          <div>
            <label className="font-medium">Clinic</label>
            <select
              value={clinicId}
              onChange={(e) => handleClinicChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select clinic</option>
              {clinics.map((c) => (
                <option key={c.clinic_id} value={c.clinic_id}>
                  {c.clinic_name} — {c.address}
                </option>
              ))}
            </select>
          </div>

          {/* Clinic Sessions Table */}
          {clinicId && (
            <div className="border rounded-lg p-3 bg-gray-50">
              <p className="font-medium mb-2 text-blue-700">
                Clinic Available Sessions
              </p>

              {loading ? (
                <p className="text-sm text-gray-500">Loading sessions…</p>
              ) : clinicSessions.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No schedules set for this clinic.
                </p>
              ) : (
                <table className="w-full text-xs border">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-2 text-left">Day</th>
                      <th className="p-2 text-left">Start</th>
                      <th className="p-2 text-left">End</th>
                      <th className="p-2 text-left">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clinicSessions.map((s) => (
                      <tr
                        key={s.clinic_schedule_id}
                        onClick={() => setSelectedSchedule(s)}
                        className={`border-t cursor-pointer hover:bg-blue-100 ${
                          selectedSchedule?.clinic_schedule_id ===
                          s.clinic_schedule_id
                            ? "bg-blue-200"
                            : ""
                        }`}
                      >
                        <td className="p-2">{s.day_of_week}</td>
                        <td className="p-2">{s.open_time}</td>
                        <td className="p-2">{s.close_time}</td>
                        <td className="p-2">{s.session_period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedSchedule}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-300"
          >
            Save Session
          </button>
        </div>
      </div>
    </div>
  );
}
