import { useEffect } from "react";
import { useClinics } from "../../../../context/clinics/useClinics";

export default function AffiliateClinicModal({ isOpen, onClose, doctorId }) {
  const {
    allClinicsOfUser,
    loading,
    getAllClinicsOfUserNotAffiliated,
    createAffiliationDoctorToClinic, // assume this exists in provider
  } = useClinics();

  // Fetch approved clinics when modal opens
  useEffect(() => {
    getAllClinicsOfUserNotAffiliated(doctorId);
  }, [doctorId]);

  const handleAffiliate = (clinicId) => {
    createAffiliationDoctorToClinic(doctorId, clinicId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-xl shadow-lg p-6 z-10">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Affiliate Clinic
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading clinics…</p>
        ) : allClinicsOfUser.length === 0 ? (
          <p className="text-sm text-gray-500">
            No approved clinics available.
          </p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 text-left">Clinic Name</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Owner</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {allClinicsOfUser.map((c) => (
                <tr key={c.clinic_id} className="border-t hover:bg-blue-50">
                  <td className="p-2">{c.clinic_name}</td>
                  <td className="p-2">{c.address}</td>
                  <td className="p-2">{c.owner_name}</td>
                  <td className="p-2">
                    <button
                      className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                      onClick={() => handleAffiliate(c.clinic_id)}
                    >
                      Affiliate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
