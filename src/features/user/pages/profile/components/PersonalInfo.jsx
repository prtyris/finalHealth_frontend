import React, { useEffect, useState } from "react";
import { getPersonalInfo, updateProfile } from "../../../../../api/profileApi";

import AlertModal from "../../../../../components/AlertModal";

const PersonalInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const user = JSON.parse(localStorage.getItem("user")); // userId from login

  useEffect(() => {
    async function loadData() {
      const response = await getPersonalInfo(user.userId);

      if (response.success) {
        const u = response.userInfo.user;
        const p = response.userInfo.profile;

        setProfileData({
          firstName: p.fName,
          middleName: p.mName,
          lastName: p.lName,
          email: u.email,
          contactNumber: p.contactNum,
          dateOfBirth: p.birthDate?.substring(0, 10),
          address: p.address,
        });
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);

    const payload = {
      fName: profileData.firstName,
      mName: profileData.middleName,
      lName: profileData.lastName,
      contactNum: profileData.contactNumber,
      birthDate: profileData.dateOfBirth,
      address: profileData.address,
    };

    const result = await updateProfile(user.userId, payload);

    setSaving(false);

    if (result.success) {
      setAlert({
        show: true,
        type: "success",
        message: "Profile updated successfully!",
      });
    } else {
      setAlert({
        show: true,
        type: "error",
        message: "Failed to update profile.",
      });
    }
  };

  if (loading || !profileData) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {alert.show && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        />
      )}
      {/* FIRST — NAME FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={profileData.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* EMAIL + CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            disabled
            value={profileData.email}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            value={profileData.contactNumber}
            onChange={(e) => handleInputChange("contactNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* DATE OF BIRTH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address
        </label>
        <input
          type="text"
          value={profileData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* SAVE BUTTON */}
      <div className="">
        <div className="flex w-6/12 items-end">
          <button
            disabled={saving}
            onClick={handleSaveChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
            rounded-lg transition-colors font-medium"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
