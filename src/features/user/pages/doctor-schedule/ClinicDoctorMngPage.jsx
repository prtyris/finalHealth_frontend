import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import { useDoctors } from "../../context/doctors/useDoctors";
import { useClinics } from "../../context/clinics/useClinics";

import AddDoctorModal from "./doctor-related/modals/AddDoctorModal";
import AddClinicModal from "./clinic-related/modals/AddClinicModal";

export default function ClinicDoctorMngPage() {
  const { getAllDoctorsOfUser, doctors } = useDoctors();
  const { getAllClinicsOfUser, allClinics } = useClinics();

  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);

  useEffect(() => {
    getAllDoctorsOfUser();
  }, []);

  useEffect(() => {
    getAllClinicsOfUser();
  }, []);

  return (
    <Layout>
      <AddDoctorModal
        isOpen={showAddDoctor}
        onClose={() => setShowAddDoctor(false)}
      />
      <AddClinicModal
        isOpen={showAddClinicModal}
        onClose={() => setShowAddClinicModal(false)}
      />
      <div className="p-6 space-y-8">
        {/* ================= DOCTORS ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-700">Doctors</h2>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowAddDoctor(true)}
            >
              + Add Doctor
            </button>
          </div>

          <table className="w-full border text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 text-left">Doctor Name</th>
                <th className="p-2 text-left">Specialization</th>
                <th className="p-2 text-left">License</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((d) => (
                <tr
                  key={d.doctor_id}
                  className="border-t hover:bg-blue-50 cursor-pointer"
                >
                  <td className="p-2 text-blue-500">
                    <Link to={`/user/manage-doctor/${d.doctor_id}`}>
                      Dr. {d.f_name} {d.l_name}
                    </Link>
                  </td>
                  <td className="p-2">{d.specialization}</td>
                  <td className="p-2">{d.license_number}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        d.verification_status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {d.verification_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= CLINICS ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-700">Clinics</h2>

            <button
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => setShowAddClinicModal(true)}
            >
              + Add Clinic
            </button>
          </div>

          <table className="w-full border text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 text-left">Clinic Name</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {allClinics.map((c) => (
                <tr key={c.clinic_id} className="border-t hover:bg-blue-50">
                  <Link to={`/user/manage-clinic/${c.clinic_id}`}>
                    <td className="p-2 text-blue-500">{c.clinic_name}</td>
                  </Link>
                  <td className="p-2">{c.address}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                      {c.verification_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
