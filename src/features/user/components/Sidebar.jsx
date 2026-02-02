import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar({ isOpen, setIsOpen, isMobile = false }) {
  const [userInfo, setUserInfo] = useState({
    fullName: "N/A",
    email: "N/A",
    profileImgUrl: null,
  });

  // Function to load user info from localStorage
  const loadUserInfo = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("user")) || {};

      const fullName = `${stored.firstName || ""} ${
        stored.middleName || ""
      } ${stored.lastName || ""}`.trim();

      setUserInfo({
        fullName: fullName || "N/A",
        email: stored.email || "N/A",
        profileImgUrl: stored.profileImgUrl || null,
      });
    } catch (err) {
      console.error("Failed to load userInformations:", err);
    }
  };

  useEffect(() => {
    // Initial load when component mounts
    loadUserInfo();

    // Listen for profile image updates from ProfileView
    const handleProfileImageUpdated = (event) => {
      if (event.detail?.profileImgUrl) {
        setUserInfo((prev) => ({
          ...prev,
          profileImgUrl: event.detail.profileImgUrl,
        }));
      }
    };

    // Listen for storage changes (when ProfileView saves to localStorage)
    const handleStorageChange = () => {
      console.log("Sidebar: Storage event triggered, reloading user info");
      loadUserInfo();
    };

    // Add event listeners
    window.addEventListener("profileImageUpdated", handleProfileImageUpdated);
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener(
        "profileImageUpdated",
        handleProfileImageUpdated,
      );
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const menu = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="h-5" />,
      link: "/user/dashboard",
    },
    {
      name: "Appointments",
      icon: <CalendarIcon className="h-5" />,
      link: "/user/appointments",
    },
    {
      name: "Patients",
      icon: <UsersIcon className="h-5" />,
      link: "/user/patients",
    },
    {
      name: "Doctor Schedule",
      icon: <ClockIcon className="h-5" />,
      link: "/user/doctor-clinic-management",
    },
    {
      name: "Subscription",
      icon: <CreditCardIcon className="h-5" />,
      link: "/user/subscription",
    },
    {
      name: "Profile",
      icon: <UserIcon className="h-5" />,
      link: "/user/profile",
    },
  ];

  // Function to get the profile image URL
  const getProfileImageSrc = () => {
    // First check if we have a profile image in state
    if (userInfo.profileImgUrl) {
      return userInfo.profileImgUrl;
    }

    // Fallback: Check localStorage directly (in case state hasn't updated yet)
    try {
      const stored = JSON.parse(localStorage.getItem("user")) || {};
      if (stored.profileImgUrl) {
        return stored.profileImgUrl;
      }
    } catch (err) {
      console.error("Error reading localStorage:", err);
    }

    // Final fallback: Use user initials as avatar
    const initials =
      userInfo.fullName !== "N/A"
        ? userInfo.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";
    return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=fff&bold=true&size=128`;
  };

  // Handle logout - PRESERVE user data including profile image
  const handleLogout = () => {
    // Remove ONLY the authentication token and selection data
    localStorage.removeItem("user_token");
    localStorage.removeItem("selectedDoctorId");
    localStorage.removeItem("selectedClinicId");
    localStorage.removeItem("selectedDoctorIdPatientPage");
    localStorage.removeItem("selectedClinicIdPatientPage");
    localStorage.removeItem("user");
    localStorage.removeItem("userInformations");

    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/40 z-20 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-white shadow-lg fixed left-0 h-[calc(100vh-4rem)] top-16 overflow-y-auto
          ${
            isMobile
              ? `w-64 z-30 transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-200 md:hidden`
              : `hidden md:block w-64`
          }
        `}
      >
        {/* Container for content with flex column layout */}
        <div className="flex flex-col h-full">
          {/* HEADER - Adjusted spacing since navbar is above */}
          <div className="p-4 pb-2 flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <img
                src={getProfileImageSrc()}
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                alt="Profile"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "56px",
                  height: "56px",
                }}
                onError={(e) => {
                  // If image fails to load, fallback to initials avatar
                  const initials =
                    userInfo.fullName !== "N/A"
                      ? userInfo.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U";
                  e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=fff&bold=true&size=128`;
                }}
              />
              {/* Online status indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-gray-800 truncate max-w-[150px]">
                {userInfo.fullName}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-[150px]">
                {userInfo.email}
              </p>
            </div>
          </div>

          {/* MENU - This will scroll if content is too long */}
          <nav className="p-4 space-y-1 flex-grow">
            {menu.map((m, i) => (
              <a
                key={i}
                href={m.link}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-gray-700"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-blue-500">{m.icon}</span>
                <span className="font-medium">{m.name}</span>
              </a>
            ))}
          </nav>

          {/* LOGOUT - Fixed at bottom */}
          <div className="p-4 mt-auto border-t border-gray-100">
            <button
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-gray-700"
              onClick={handleLogout}
            >
              <ArrowLeftOnRectangleIcon className="h-5 text-red-500" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
