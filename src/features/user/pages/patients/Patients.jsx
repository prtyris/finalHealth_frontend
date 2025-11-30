import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { getAllPatients } from "../../../../api/patientApi"; // API call to fetch all patients
import { Link } from "react-router-dom"; // Import Link for routing

const Patients = () => {
  const [patients, setPatients] = useState([]); // Store patients

  // Fetch patients when the component is mounted
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await getAllPatients();
      if (res.success) {
        setPatients(res.patients); // Update state with the fetched patients
      }
    };
    fetchPatients(); // Fetch patients
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-6 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Patient Records
        </h2>

        {/* Patient records table */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gender
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.patient_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{`${patient.f_name} ${patient.l_name}`}</td>
                  <td className="px-4 py-3 text-sm">{patient.gender}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date().getFullYear() -
                      new Date(patient.date_of_birth).getFullYear()}
                    {console.log(patient)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/user/patients/${patient.patient_id}/medical-history`}
                    >
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs">
                        View Patient
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Patients;
