import React, { useState, useEffect, useRef } from "react";
import PersonalInfo from "./components/PersonalInfo";
import ChangePassword from "./components/ChangePassword";
import ActivityHistory from "./components/ActivityHistory";
import Layout from "../../components/Layout";

import logo from "../../../../assets/logo.png";
import { resolveImageUrl } from "../../../../utils/resolveImageUrl.js";

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

  // Load localStorage safely AFTER first render - UPDATED to check localStorage on every render
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user")) || {};
        console.log("Loaded from localStorage:", stored); // Debug log

        const fullName = `${stored.firstName || ""} ${
          stored.middleName || ""
        } ${stored.lastName || ""}`.trim();

        // IMPORTANT: Check for profileImgUrl in localStorage
        const profileImgUrl = stored.profileImgUrl || null;
        console.log("Profile image URL from storage:", profileImgUrl); // Debug log

        setUserInfo({
          fullName:
            `${stored.firstName || ""} ${stored.middleName || ""} ${stored.lastName || ""}`.trim() ||
            "N/A",
          email: stored.email || "N/A",
          profileImgUrl: profileImgUrl,
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUserInfo();

    loadUserInfo();
  }, []); // Empty dependency array means this runs once on mount

  // Also add an effect to update when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      if (stored.profileImgUrl && stored.profileImgUrl !== userInfo.profileImgUrl) {
        setUserInfo(prev => ({
          ...prev,
          profileImgUrl: stored.profileImgUrl
        }));
      }
    };

    // Listen for storage events (if profile is updated in another tab)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userInfo.profileImgUrl]);

  // Simulate upload progress
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prev) => Math.min(prev + 20, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (uploadProgress === 100) {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  }, [isUploading, uploadProgress]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPreviewImage(imageDataUrl);
        setIsUploading(true);
        setUploadProgress(10);
        
        // Save immediately to localStorage for persistence
        saveImageToStorage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save image to localStorage
  const saveImageToStorage = (imageDataUrl) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.profileImgUrl = imageDataUrl;
      localStorage.setItem("user", JSON.stringify(storedUser));
      console.log("Saved to localStorage:", storedUser); // Debug log
      
      // Update state immediately
      setUserInfo(prev => ({
        ...prev,
        profileImgUrl: imageDataUrl
      }));
      
      // Force a storage event to trigger updates
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to save image to localStorage:', err);
      alert('Failed to save image. Please try again.');
    }
  };

  const handleSaveImage = () => {
    if (previewImage) {
      saveImageToStorage(previewImage);
      
      // Show success message
      alert('Profile image updated successfully!');
      
      // Reset editing state
      setPreviewImage(null);
      setIsEditingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancelEdit = () => {
    setPreviewImage(null);
    setIsEditingImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Function to get current image source - FIXED to prioritize localStorage
  const getProfileImageSrc = () => {
    // First check preview (if editing)
    if (previewImage) return previewImage;
    
    // Then check userInfo state (loaded from localStorage)
    if (userInfo.profileImgUrl) {
      // Check if it's a data URL or a regular URL
      if (userInfo.profileImgUrl.startsWith('data:image')) {
        return userInfo.profileImgUrl;
      }
      return resolveImageUrl(userInfo.profileImgUrl);
    }
    
    // Fallback to logo
    return logo;
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
          {/* Profile Header - Enhanced Design with Upload Functionality */}
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
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Change Photo
                    </span>
                  </button>

                  {/* Upload Overlay Modal */}
                  {isEditingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 rounded-full flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                      <div className="text-white text-center mb-4">
                        <p className="font-semibold text-lg">Update Profile Image</p>
                        <p className="text-sm opacity-80 mt-1">Max 5MB • JPG, PNG, GIF, WebP</p>
                        <p className="text-xs opacity-60 mt-2">Image will be saved automatically</p>
                      </div>
                      
                      <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2.5 px-5 rounded-lg mb-4 transition-colors shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose Image
                      </button>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      {isUploading && (
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                          <div className="text-white text-xs mt-1">
                            {uploadProgress}% uploaded • Saving to storage...
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <button
                          onClick={handleSaveImage}
                          disabled={!previewImage || isUploading}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-lg ${
                            previewImage && !isUploading
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {isUploading ? 'Uploading...' : 'Save'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-lg">{userInfo.email}</span>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Active Now
                  </span>
                </div>

                {/* User Bio/Info - Removed Stats Cards */}
                <div className="mt-4 max-w-md">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Welcome to your profile dashboard. Manage your personal information, 
                    security settings, and track your activity history.
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
                  <span className={`absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'w-full bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'w-0 group-hover:w-full bg-gradient-to-r from-blue-300 to-purple-300'
                  }`}></span>
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
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
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