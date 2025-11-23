import React, { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import ChangePassword from './components/ChangePassword';
import ActivityHistory from './components/ActivityHistory';

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'password', label: 'Change Password' },
    { id: 'activity', label: 'Activity History' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center text-white font-semibold text-3xl">
              K
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Kristine Olaivar
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                kristineolaivar@gmail.com
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
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
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
          {activeTab === 'personal' && <PersonalInfo />}
          {activeTab === 'password' && <ChangePassword />}
          {activeTab === 'activity' && <ActivityHistory />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          © 2025 FinalHealth. All rights reserved. GROUP 1 BSCS-501
        </div>
      </div>
    </div>
  );
};

export default ProfileView;