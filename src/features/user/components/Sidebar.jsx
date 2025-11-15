import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { label: "Dashboard", path: "/user/dashboard" },
    { label: "Appointments", path: "/user/appointments" },
    { label: "Patients", path: "/user/patients" },
    { label: "Doctor Schedule", path: "/user/schedule" },
    { label: "Subscription", path: "/user/subscription" },
    { label: "Profile", path: "/user/profile" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold text-blue-600 mb-8">FinaleHealth</h2>

      <nav className="space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block p-3 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
