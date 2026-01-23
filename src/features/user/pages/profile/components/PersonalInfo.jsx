import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/users/useUser";
import { updateProfile } from "../../../../../api/profileApi";
import AlertModal from "../../../../../components/AlertModal";

const PersonalInfo = () => {
  const { userInfo, loading, error, getPersonalInfo } = useUser();

  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Load from provider
  useEffect(() => {
    getPersonalInfo();
  }, []);

  // Map provider data → local form state
  useEffect(() => {
    if (!userInfo) return;

    const { user, profile } = userInfo;

    const fullName = `${profile.fName} ${profile.mName} ${profile.lName}`
      .replace(/\s+/g, " ")
      .trim();

    localStorage.setItem(
      "userInformations",
      JSON.stringify({
        email: user.email,
        profileImage: profile.profileImgPath,
        fullName,
      }),
    );

    setProfileData({
      firstName: profile.fName,
      middleName: profile.mName,
      lastName: profile.lName,
      email: user.email,
      contactNumber: profile.contactNum,
      dateOfBirth: profile.birthDate?.substring(0, 10),
      address: profile.address,
    });
  }, [userInfo]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!userInfo) return;

    setSaving(true);

    const payload = {
      fName: profileData.firstName,
      mName: profileData.middleName,
      lName: profileData.lastName,
      contactNum: profileData.contactNumber,
      birthDate: profileData.dateOfBirth,
      address: profileData.address,
    };

    const result = await updateProfile(userInfo.user.userId, payload);

    setSaving(false);

    setAlert({
      show: true,
      type: result.success ? "success" : "error",
      message: result.success
        ? "Profile updated successfully!"
        : "Failed to update profile.",
    });
  };

  if (loading || !profileData) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center">
        Loading profile...
      </p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
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

      {/* NAME FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Field
          label="First Name"
          value={profileData.firstName}
          onChange={(v) => handleInputChange("firstName", v)}
        />
        <Field
          label="Middle Name"
          value={profileData.middleName}
          onChange={(v) => handleInputChange("middleName", v)}
        />
        <Field
          label="Last Name"
          value={profileData.lastName}
          onChange={(v) => handleInputChange("lastName", v)}
        />
      </div>

      {/* EMAIL + CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            disabled
            value={profileData.email}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <Field
          label="Contact Number"
          value={profileData.contactNumber}
          onChange={(v) => handleInputChange("contactNumber", v)}
          type="tel"
        />
      </div>

      {/* DATE OF BIRTH */}
      <Field
        label="Date of Birth"
        type="date"
        value={profileData.dateOfBirth}
        onChange={(v) => handleInputChange("dateOfBirth", v)}
      />

      {/* ADDRESS */}
      <Field
        label="Address"
        value={profileData.address}
        onChange={(v) => handleInputChange("address", v)}
      />

      {/* SAVE */}
      <div className="w-6/12">
        <button
          disabled={saving}
          onClick={handleSaveChanges}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;

/* ---------- SMALL COMPONENT ---------- */
function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-3 py-2 rounded-lg border
          border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          focus:ring-2 focus:ring-blue-500
          focus:outline-none
        "
      />
    </div>
  );
}
