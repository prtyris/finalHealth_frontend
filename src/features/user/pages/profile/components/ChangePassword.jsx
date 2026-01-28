import React, { useState, useRef } from "react";
import AlertModal from "../../../../../components/AlertModal";
import { useUser } from "../../../context/users/useUser";

const AccountSettings = () => {
  const { updateSettings, refreshUser } = useUser(); // ✅ PROVIDER

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false }), 3000);
  };

  const togglePasswordVisibility = (field) =>
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const payload = {
        currentPassword: current || undefined,
        newPassword: newPass || undefined,
        imageFile: imageFile || undefined,
      };

      await updateSettings(payload);
      await refreshUser();

      showAlert("success", "Settings updated successfully");

      window.location.reload(true);
      window.location.reload(true);

      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      showAlert("error", "Unexpected error occurred");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
      <AlertModal
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />

      {/* PASSWORD SECTION */}
      <div className="space-y-6">
        {["current", "new", "confirm"].map((field) => (
          <div key={field} className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {field === "current"
                ? "Current Password"
                : field === "new"
                  ? "New Password"
                  : "Confirm New Password"}
            </label>
            <input
              type={showPassword[field] ? "text" : "password"}
              value={
                field === "current"
                  ? current
                  : field === "new"
                    ? newPass
                    : confirm
              }
              onChange={(e) =>
                field === "current"
                  ? setCurrent(e.target.value)
                  : field === "new"
                    ? setNewPass(e.target.value)
                    : setConfirm(e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border dark:border-gray-600"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field)}
              className="absolute right-3 top-9 text-gray-400"
            >
              👁
            </button>
          </div>
        ))}
      </div>

      {/* IMAGE SECTION */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl overflow-hidden">
          {profileImage ? (
            <img src={profileImage} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl text-white font-bold">
              K
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          onClick={triggerFileInput}
          className="bg-blue-600 px-6 py-2 rounded-lg text-white"
        >
          Upload Photo
        </button>

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-2 rounded-lg text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
