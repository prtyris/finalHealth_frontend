import React, { useEffect } from "react";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { useUser } from "../context/users/useUser";

export default function Sidebar({ isOpen, setIsOpen, isMobile = false }) {
  const { getPersonalInfo, userInfo } = useUser();

  // 🔹 Load user info from backend ONCE
  useEffect(() => {
    getPersonalInfo();
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

  // 🔹 Image source from CONTEXT
  const getProfileImageSrc = () => {
    if (userInfo?.profile.profileImgPath)
      return userInfo.profile.profileImgPath;

    const initials =
      userInfo?.profile.fName || userInfo?.profile.lName
        ? `${userInfo.profile.fName || ""} ${userInfo.profile.lName || ""}`
            .trim()
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U";

    return `https://ui-avatars.com/api/?name=${initials}&background=3B82F6&color=fff&bold=true&size=128`;
  };

  const fullName =
    `${userInfo?.profile.fName || ""} ${userInfo?.profile.mName || ""} ${userInfo?.profile.lName || ""}`.trim() ||
    "N/A";

  const email = userInfo?.user.email || "N/A";

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/";
  };

  return (
    <>
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/40 z-20 md:hidden ${isOpen ? "block" : "hidden"}`}
          onClick={() => setIsOpen(false)}
        />
      )}

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
        <div className="flex flex-col h-full">
          <div className="p-4 pb-2 flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <img
                src={getProfileImageSrc()}
                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                alt="Profile"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div className="flex flex-col min-w-0">
              <p className="font-semibold text-gray-800 truncate max-w-[150px]">
                {fullName}
              </p>
              <p className="text-sm text-gray-500 truncate max-w-[150px]">
                {email}
              </p>
            </div>
          </div>

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
