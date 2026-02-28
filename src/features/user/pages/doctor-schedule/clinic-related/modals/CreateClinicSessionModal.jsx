import { useState } from "react";
import { useClinics } from "../../../../context/clinics/useClinics";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateClinicSessionModal({
  isOpen,
  onClose,
  clinicId,
}) {
  const { createClinicSession, getClinicSessions } = useClinics();

  const [sessions, setSessions] = useState(
    DAYS.map((day) => ({
      day_of_week: day,
      open_time: "",
      close_time: "",
    }))
  );

  const [applyAll, setApplyAll] = useState(false);

  if (!isOpen) return null;

  /* ================= HANDLERS ================= */

  const handleTimeChange = (index, field, value) => {
    const updated = [...sessions];
    updated[index][field] = value;

    // If Apply All is active → copy to all
    if (applyAll && (field === "open_time" || field === "close_time")) {
      updated.forEach((s, i) => {
        updated[i][field] = value;
      });
    }

    setSessions(updated);
  };

  const handleSubmit = async () => {
    // Filter only days with values
    const validSessions = sessions.filter(
      (s) => s.open_time && s.close_time
    );

    for (const s of validSessions) {
      await createClinicSession(clinicId, s);
    }

    await getClinicSessions(clinicId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-blue-50/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="
          relative bg-white 
          w-full 
          max-w-4xl 
          rounded-2xl 
          border-4 border-blue-600 
          shadow-xl 
          z-10
          max-h-[95vh]
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 min-w-[700px] sm:min-w-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-blue-700">
              Add Clinic Sessions
            </h3>
            <button
              className="text-blue-600 hover:text-blue-800 text-xl font-bold"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          {/* Apply All */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              checked={applyAll}
              onChange={() => setApplyAll(!applyAll)}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-blue-700">
              Apply selected time to all days
            </label>
          </div>

          {/* Scrollable Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm border border-blue-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Day</th>
                  <th className="p-3 text-left">Open Time</th>
                  <th className="p-3 text-left">Close Time</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, index) => (
                  <tr key={s.day_of_week} className="border-t">
                    <td className="p-3 font-medium text-gray-700 whitespace-nowrap">
                      {s.day_of_week}
                    </td>
                    <td className="p-3">
                      <input
                        type="time"
                        value={s.open_time}
                        onChange={(e) =>
                          handleTimeChange(index, "open_time", e.target.value)
                        }
                        className="w-full border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="time"
                        value={s.close_time}
                        onChange={(e) =>
                          handleTimeChange(index, "close_time", e.target.value)
                        }
                        className="w-full border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
