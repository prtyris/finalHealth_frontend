import React, { useState, useRef } from "react";
import { updateUserSettings } from "../../../../../api/profileApi";
import AlertModal from "../../../../../components/AlertModal";

const AccountSettings = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [profileImage, setProfileImage] = useState(null); // preview only
  const [imageFile, setImageFile] = useState(null); // real file to send
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
    // Conditional password validation
    if (current || newPass || confirm) {
      if (!current || !newPass || !confirm)
        return showAlert("error", "Fill all password fields");

      if (newPass !== confirm)
        return showAlert("error", "New password and confirm do not match");

      if (newPass.length < 8)
        return showAlert("error", "Password must be at least 8 characters");
    }

    const payload = {
      currentPassword: current || undefined,
      newPassword: newPass || undefined,
      imageFile: imageFile || undefined,
    };

    const res = await updateUserSettings(payload);

    if (!res.success) return showAlert("error", res.error);

    showAlert("success", "Settings updated");

    // Clear only password fields
    setCurrent("");
    setNewPass("");
    setConfirm("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
      <AlertModal
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />

      {/* Password Section */}
      <div className="space-y-6">
        {/* CURRENT PASSWORD */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Password
          </label>
          <input
            type={showPassword.current ? "text" : "password"}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border dark:border-gray-600"
            placeholder="••••"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-3 top-9 text-gray-400"
          >
            👁
          </button>
        </div>

        {/* NEW PASSWORD */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            New Password
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border dark:border-gray-600"
            placeholder="••••"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute right-3 top-9 text-gray-400"
          >
            👁
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm New Password
          </label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg dark:bg-gray-700 border dark:border-gray-600"
            placeholder="••••"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute right-3 top-9 text-gray-400"
          >
            👁
          </button>
        </div>
      </div>

      {/* Image Section */}
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
          className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700"
        >
          Upload Photo
        </button>

        <button
          onClick={handleSave}
          className="bg-green-600 px-6 py-2 rounded-lg text-white hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
