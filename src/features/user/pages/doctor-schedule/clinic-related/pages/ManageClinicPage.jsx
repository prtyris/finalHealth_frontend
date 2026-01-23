import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";

import { useParams, useNavigate } from "react-router-dom";

import { useClinics } from "../../../../context/clinics/useClinics";

import CreateClinicSessionModal from "../modals/CreateClinicSessionModal";
import EditClinicModal from "../modals/EditClinicModal";
export default function ManageClinicPage() {
  const navigate = useNavigate();
  const { clinicId } = useParams();
  const {
    getClinicInfo,
    clinicInfo,
    getClinicSessions,
    clinicSessions,
    deleteClinicSession,
  } = useClinics();
  /* ================= STATE ================= */
  const [showEdit, setShowEdit] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);

  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);

  useEffect(() => {
    getClinicInfo(clinicId);
  }, []);

  useEffect(() => {
    getClinicSessions(clinicId);
  }, []);

  const handleDeleteSession = async (clinicSessionId) => {
    await deleteClinicSession(clinicSessionId);
    await getClinicSessions(clinicId);
  };

  /* ================= HARDCODED DATA ================= */

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  /* ================= UI ================= */

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <CreateClinicSessionModal
          isOpen={showCreateSessionModal}
          onClose={() => setShowCreateSessionModal(false)}
          clinicId={clinicId}
        />
        <EditClinicModal
          isOpen={showEditInfo}
          onClose={() => setShowEditInfo(false)}
          clinicId={clinicId}
        />

        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* ================= CLINIC INFO ================= */}
        {clinicInfo.map((clinic) => (
          <div
            key={clinic.clinic_id}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-blue-700">
                Clinic Information
              </h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowEditInfo(true)}
              >
                Edit Info
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <b>Name:</b> {clinic.clinic_name}
              </p>
              <p>
                <b>Address:</b> {clinic.address}
              </p>
              <p>
                <b>Business Permit #:</b> {clinic.business_permit_no}
              </p>
              <p>
                <b>Date Registered:</b> {formatDate(clinic.date_registered)}
              </p>

              <p>
                <b>Contact #:</b> {clinic.contact_num}
              </p>
              <p>
                <b>Backup #:</b> {clinic.backup_num}
              </p>
              <p>
                <b>Owner:</b> {clinic.owner_name}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                  {clinic.verification_status}
                </span>
              </p>
            </div>
          </div>
        ))}

        {/* ================= CLINIC SESSIONS ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-blue-700">Clinic Sessions</h3>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowCreateSessionModal(true)}
            >
              + Add Session
            </button>
          </div>

          {clinicSessions.length === 0 ? (
            <p className="text-sm text-gray-500">No sessions found.</p>
          ) : (
            <table className="w-full border text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-2 text-left">Day</th>
                  <th className="p-2 text-left">Session</th>
                  <th className="p-2 text-left">Start</th>
                  <th className="p-2 text-left">End</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {clinicSessions.map((s) => (
                  <tr
                    key={s.clinic_schedule_id}
                    className="border-t hover:bg-blue-50"
                  >
                    <td className="p-2">{s.day_of_week}</td>
                    <td className="p-2">{s.session_period}</td>
                    <td className="p-2">{s.open_time}</td>
                    <td className="p-2">{s.close_time}</td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                        onClick={() =>
                          handleDeleteSession(s.clinic_schedule_id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
