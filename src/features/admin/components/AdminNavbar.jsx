import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function AdminNavbar({ setIsSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-20 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="md:hidden text-gray-600"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex items-center space-x-4">
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>
    </header>
  );
}
