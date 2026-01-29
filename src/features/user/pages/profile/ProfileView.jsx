import React, { useState, useEffect } from "react";
import PersonalInfo from "./components/PersonalInfo";
import ChangePassword from "./components/ChangePassword";
import ActivityHistory from "./components/ActivityHistory";
import Layout from "../../components/Layout";

import logo from "../../../../assets/logo.png";
import { resolveImageUrl } from "../../../../utils/resolveImageUrl.js";

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const [userInfo, setUserInfo] = useState({
    fullName: "N/A",
    email: "N/A",
    profileImgUrl: null,
  });

  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user")) || {};

        setUserInfo({
          fullName:
            `${stored.firstName || ""} ${stored.middleName || ""} ${stored.lastName || ""}`.trim() ||
            "N/A",
          email: stored.email || "N/A",
          profileImgUrl: stored.profileImage || stored.profileImgPath || null,
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUserInfo();

    // 🔥 auto-refresh when localStorage changes
    window.addEventListener("storage", loadUserInfo);
    return () => window.removeEventListener("storage", loadUserInfo);
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
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={
                  userInfo.profileImgUrl
                    ? `${resolveImageUrl(userInfo.profileImgUrl)}?v=${Date}`
                    : logo
                }
                className="rounded-full w-40 h-40 object-cover border"
                alt="Profile"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{userInfo.fullName}</h2>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm px-6 pt-6 mb-6">
            <div className="flex gap-8 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pb-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "password" && <ChangePassword />}
            {activeTab === "activity" && <ActivityHistory />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileView;
