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

export default function Sidebar({
  isOpen,
  setIsOpen,
  isMobile = false,
  isCollapsed,
  setIsCollapsed,
}) {
  const { getPersonalInfo, userInfo } = useUser();

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
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/40 z-20 md:hidden ${isOpen ? "block" : "hidden"}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-white shadow-lg fixed left-0 top-16 z-30
          h-[calc(100vh-4rem)] overflow-y-auto
          transition-all duration-200
          ${
            isMobile
              ? `w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`
              : isCollapsed
                ? "hidden md:block w-20"
                : "hidden md:block w-64"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* PROFILE */}
          <div className="p-4 pb-2 flex items-center space-x-3">
            <img
              src={getProfileImageSrc()}
              className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
              alt="Profile"
            />

            <div className="flex items-start justify-between w-full min-w-0">
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {fullName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{email}</p>
                </div>
              )}

              {!isMobile && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  {isCollapsed ? "▶" : "◀"}
                </button>
              )}
            </div>
          </div>

          {/* MENU */}
          <nav className="p-4 space-y-1 flex-grow">
            {menu.map((m, i) => (
              <a
                key={i}
                href={m.link}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-blue-500">{m.icon}</span>
                {!isCollapsed && <span>{m.name}</span>}
              </a>
            ))}
          </nav>

          {/* LOGOUT */}
          <div className="p-4 border-t">
            <button
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 w-full"
              onClick={handleLogout}
            >
              <ArrowLeftOnRectangleIcon className="h-5 text-red-500" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
