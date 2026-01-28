import React, { useState, useEffect } from "react";
import PersonalInfo from "./components/PersonalInfo";
import ChangePassword from "./components/ChangePassword";
import ActivityHistory from "./components/ActivityHistory";
import Layout from "../../components/Layout";

import logo from "../../../../assets/logo.png";

import { resolveImageUrl } from "../../../../utils/resolveImageUrl.js";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // NEW: Safe state for user info
  const [userInfo, setUserInfo] = useState({
    fullName: "N/A",
    email: "N/A",
    profileImgUrl: null,
  });

  // Load localStorage safely AFTER first render
  useEffect(() => {
    function loadUserInfo() {
      try {
        const stored =
          JSON.parse(localStorage.getItem("userInformations")) || {};

        setUserInfo({
          fullName: stored.fullName || "N/A",
          email: stored.email || "N/A",
          profileImgUrl: stored.profileImage || null,
        });
      } catch (err) {
        console.error("Failed to load userInformations:", err);
      }
    }

    loadUserInfo(); // call the wrapper function
  }, []);

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "password", label: "Change Password" },
    { id: "activity", label: "Activity History" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={resolveImageUrl(userInfo.profileImgUrl) || logo}
                className="rounded-full w-40 h-40 object-cover border"
                alt="Profile"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.fullName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {userInfo.email}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm px-6 pt-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "password" && <ChangePassword />}
            {activeTab === "activity" && <ActivityHistory />}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2025 FinalHealth. All rights reserved. GROUP 1 BSCS-501
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileView;
