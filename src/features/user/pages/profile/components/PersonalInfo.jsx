import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../../../context/users/useUser";
import { updateProfile } from "../../../../../api/profileApi";
import AlertModal from "../../../../../components/AlertModal";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiHome,
  FiEdit,
  FiSave,
  FiX,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

const PersonalInfo = () => {
  const { userInfo, loading, error, getPersonalInfo } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const originalDataRef = useRef(null);

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

    const newProfileData = {
      firstName: profile.fName,
      middleName: profile.mName,
      lastName: profile.lName,
      email: user.email,
      contactNumber: profile.contactNum,
      dateOfBirth: profile.birthDate?.substring(0, 10),
      address: profile.address,
    };

    setProfileData(newProfileData);
    originalDataRef.current = { ...newProfileData };
  }, [userInfo]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setProfileData({ ...originalDataRef.current });
    setEditing(false);
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

    try {
      const result = await updateProfile(userInfo.user.userId, payload);

      setSaving(false);
      setEditing(false);

      setAlert({
        show: true,
        type: result.success ? "success" : "error",
        message: result.success
          ? "Profile updated successfully!"
          : "Failed to update profile.",
      });

      if (result.success) {
        originalDataRef.current = { ...profileData };
        getPersonalInfo(); // Refresh data
      }
    } catch (error) {
      setSaving(false);
      setAlert({
        show: true,
        type: "error",
        message: "An error occurred while updating profile.",
      });
    }
  };

  // Show loading only when actually loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={getPersonalInfo}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no profile data yet (but not loading), show minimal loading
  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 animate-fadeIn">
      {/* Alert Modal */}
      {alert.show && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        />
      )}

      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FiUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Personal Information
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl">
            Manage your personal details. All information is securely stored and encrypted.
          </p>
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 mt-6 rounded-full"></div>
        </div>

        {/* Profile Summary */}
        <div className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {profileData?.firstName} {profileData?.middleName} {profileData?.lastName}
            </h2>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-600 mb-6">
            <FiMail className="text-blue-500" />
            <span>{profileData?.email}</span>
          </div>
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full"></div>
        </div>

        {/* Name Information Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
            Name Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                FIRST NAME
              </label>
              {editing ? (
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={profileData?.firstName || ""}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-800">{profileData?.firstName || "—"}</span>
                </div>
              )}
            </div>

            {/* Middle Name */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                MIDDLE NAME
              </label>
              {editing ? (
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    value={profileData?.middleName || ""}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    placeholder="Enter middle name"
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-800">{profileData?.middleName || "—"}</span>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                LAST NAME
              </label>
              {editing ? (
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
                    value={profileData?.lastName || ""}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-800">{profileData?.lastName || "—"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Address */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                EMAIL ADDRESS
              </label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                <FiMail className="text-blue-500" />
                <span className="text-gray-800">{profileData?.email || "—"}</span>
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                CONTACT NUMBER
              </label>
              {editing ? (
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
                  <input
                    type="tel"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    value={profileData?.contactNumber || ""}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-800">{profileData?.contactNumber || "—"}</span>
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                DATE OF BIRTH
              </label>
              {editing ? (
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                    value={profileData?.dateOfBirth || ""}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-800">
                    {profileData?.dateOfBirth
                      ? new Date(profileData.dateOfBirth).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              )}
            </div>

            {/* Address - Full Width */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ADDRESS
              </label>
              {editing ? (
                <div className="relative">
                  <FiHome className="absolute left-4 top-4 text-blue-500" />
                  <textarea
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px] resize-vertical"
                    value={profileData?.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl whitespace-pre-wrap">
                  <span className="text-gray-800">{profileData?.address || "—"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            {!editing ? (
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                onClick={handleEdit}
                disabled={saving}
              >
                <FiEdit />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <FiX />
                  Cancel
                </button>

                <button
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  onClick={handleSaveChanges}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FiRefreshCw className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <FiShield className="text-blue-500" />
            <span>
              Your information is secured with end-to-end encryption • Last updated:{" "}
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
        
        /* Date input styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
        
        /* Remove arrows from number input */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default PersonalInfo;