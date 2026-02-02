import React, { useState, useEffect, useRef } from "react";
import PersonalInfo from "./components/PersonalInfo";
import ChangePassword from "./components/ChangePassword";
import ActivityHistory from "./components/ActivityHistory";
import Layout from "../../components/Layout";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const fileInputRef = useRef(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Safe state for user info
  const [userInfo, setUserInfo] = useState({
    fullName: "N/A",
    email: "N/A",
    profileImgUrl: null,
  });

  // Load user info from localStorage
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user")) || {};
        console.log("ProfileView: Loaded from localStorage:", stored);

        const fullName = `${stored.firstName || ""} ${
          stored.middleName || ""
        } ${stored.lastName || ""}`.trim();

        const profileImgUrl = stored.profileImgUrl || null;

        setUserInfo({
          fullName: fullName || "N/A",
          email: stored.email || "N/A",
          profileImgUrl: profileImgUrl,
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUserInfo();
  }, []);

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setPreviewImage(imageUrl);
      setIsUploading(true);
      setUploadProgress(10);

      // Save immediately to localStorage
      saveImageToStorage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  // Save image to localStorage
  const saveImageToStorage = async (imageDataUrl) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.profileImgUrl = imageDataUrl;
      localStorage.setItem("user", JSON.stringify(storedUser));
      console.log("ProfileView: Saved image to localStorage");

      // Update state
      setUserInfo((prev) => ({
        ...prev,
        profileImgUrl: imageDataUrl,
      }));

      // Dispatch custom event for Sidebar
      window.dispatchEvent(
        new CustomEvent("profileImageUpdated", {
          detail: { profileImgUrl: imageDataUrl },
        }),
      );

      // Also dispatch storage event
      window.dispatchEvent(new Event("storage"));

      // Simulate upload progress
      setTimeout(() => {
        setUploadProgress(50);
        setTimeout(() => {
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);

            // Auto-close after success
            setTimeout(() => {
              setIsEditingImage(false);
              setPreviewImage(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }, 800);
          }, 300);
        }, 300);
      }, 300);
    } catch (err) {
      console.error("Failed to save image to localStorage:", err);
      alert("Failed to save image. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setPreviewImage(null);
    setIsEditingImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle upload click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Function to get current image source
  const getProfileImageSrc = () => {
    // First check preview (if editing)
    if (previewImage) return previewImage;

    // Then check userInfo state (loaded from localStorage)
    if (userInfo.profileImgUrl) {
      return userInfo.profileImgUrl;
    }

    // Fallback to initials avatar
    const initials =
      userInfo.fullName !== "N/A"
        ? userInfo.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";
    return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=fff&bold=true&size=256`;
  };

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "password", label: "Change Password" },
    { id: "activity", label: "Activity History" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl p-8 mb-8 border border-blue-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image Container */}
              <div className="relative">
                {/* Decorative Ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-lg"></div>

                {/* Profile Image with Upload Overlay */}
                <div className="relative">
                  <img
                    src={getProfileImageSrc()}
                    className="rounded-full w-44 h-44 object-cover border-4 border-white dark:border-gray-800 shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    alt="Profile"
                    onClick={() => setIsEditingImage(true)}
                  />

                  {/* Edit Profile Button */}
                  <button
                    onClick={() => setIsEditingImage(true)}
                    className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Change Photo
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                {/* Name with Gradient Effect */}
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent mb-3">
                  {userInfo.fullName}
                </h1>

                {/* Email with Icon */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-lg">{userInfo.email}</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Active Now
                  </span>
                </div>

                {/* User Bio/Info */}
                <div className="mt-4 max-w-md">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Welcome to your profile dashboard. Manage your personal
                    information, security settings, and track your activity
                    history.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                      Premium Member
                    </span>
                    <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-sm font-medium px-3 py-1.5 rounded-full">
                      Verified Account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Popup Modal */}
          {isEditingImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              {/* Modal Card Only - No Background Overlay */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 pointer-events-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Update Profile Picture
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Choose a new image for your profile
                      </p>
                    </div>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Upload Area */}
                  <div className="text-center mb-6">
                    {isUploading ? (
                      <div className="py-8">
                        <div className="w-16 h-16 mx-auto mb-4">
                          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                          Uploading...
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Processing your image
                        </p>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={handleUploadClick}
                      >
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                          Click to upload
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Supports JPG, PNG, GIF, WebP (Max 5MB)
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Upload Button */}
                    {!isUploading && (
                      <button
                        onClick={handleUploadClick}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
                      >
                        Browse Files
                      </button>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isUploading && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>Uploading...</span>
                        <span className="font-medium">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  {previewImage && !isUploading && (
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Preview
                      </p>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white dark:border-gray-700 shadow-md"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your photo will be saved automatically and updated
                      everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl px-6 pt-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`relative pb-5 px-1 font-medium text-base transition-all duration-300 group ${
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300 ${
                      activeTab === tab.id
                        ? "w-full bg-gradient-to-r from-blue-500 to-purple-500"
                        : "w-0 group-hover:w-full bg-gradient-to-r from-blue-300 to-purple-300"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "password" && <ChangePassword />}
            {activeTab === "activity" && <ActivityHistory />}
          </div>

          {/* Enhanced Footer */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-4">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Profile image saved in browser storage
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 FinalHealth. All rights reserved. GROUP 1 BSCS-601
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileView;
