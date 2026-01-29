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

import Logo from "../../../assets/logo.png";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

export default function Sidebar({ isOpen, setIsOpen, isMobile = false }) {
  const [userInfo, setUserInfo] = useState({
    fullName: "N/A",
    email: "N/A",
    profileImgUrl: null,
  });

  // ✅ SAME LOGIC AS FIXED ProfileView
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user")) || {};

        setUserInfo({
          fullName:
            `${stored.firstName || ""} ${stored.middleName || ""} ${
              stored.lastName || ""
            }`.trim() || "N/A",
          email: stored.email || "N/A",
          profileImgUrl: stored.profileImage || stored.profileImgPath || null,
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUserInfo();

    // 🔥 keep Sidebar in sync after profile updates
    window.addEventListener("storage", loadUserInfo);
    return () => window.removeEventListener("storage", loadUserInfo);
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

  return (
    <>
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/40 z-20 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`bg-white h-full shadow-lg ${
          isMobile
            ? `fixed inset-y-0 left-0 w-64 z-30 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-200 md:hidden`
            : `hidden md:block w-64`
        }`}
      >
        {/* HEADER */}
        <div className="p-4 flex items-center space-x-3">
          <img
            src={
              userInfo.profileImgUrl
                ? `${resolveImageUrl(userInfo.profileImgUrl)}?v=${Date.now()}`
                : Logo
            }
            className="w-14 h-14 rounded-full object-cover"
            alt="Profile"
          />
          <p className="font-semibold">{userInfo.fullName}</p>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1">
          {menu.map((m, i) => (
            <a
              key={i}
              href={m.link}
              className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => isMobile && setIsOpen(false)}
            >
              {m.icon}
              <span>{m.name}</span>
            </a>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full px-4">
          <button
            className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <ArrowLeftOnRectangleIcon className="h-5" />
            <span>Logout</span>
          </button>

          <p className="mt-4 text-xs text-gray-500">{userInfo.email}</p>
        </div>
      </aside>
    </>
  );
}
