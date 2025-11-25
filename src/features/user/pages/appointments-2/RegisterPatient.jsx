import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../../../../api/patientApi"; // API call for registering patient
import Layout from "../../components/Layout";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    gender: "Male",
    dateOfBirth: "",
    contactNumber: "",
    backupContact: "",
    email: "",
    address: "",
    patientTypeId: 1, // Default to normal
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerPatient(formData);
    if (res?.success) {
      alert("Patient registered successfully!");
      navigate("/user/appointments/create"); // Redirect back to appointments page
    } else {
      alert("Failed to register patient.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/appointments")}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mb-6"
        >
          Back
        </button>
        <h2 className="text-3xl font-semibold mb-6">Register New Patient</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 ">
          <div className="input-group">
            <label className="font-semibold mb-2">First Name</label>
            <input
              type="text"
              value={formData.fName}
              onChange={(e) => handleInputChange("fName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Middle Name</label>
            <input
              type="text"
              value={formData.mName}
              onChange={(e) => handleInputChange("mName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lName}
              onChange={(e) => handleInputChange("lName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group ">
            <label className="font-semibold mb-2">Backup Contact Number</label>
            <input
              type="text"
              value={formData.backupContact}
              onChange={(e) =>
                handleInputChange("backupContact", e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="input-group">
            <label className="font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="input-group col-span-2">
            <label className="font-semibold mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="col-span-2 mt-4 py-3 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
          >
            Register Patient
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPatient;
