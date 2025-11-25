import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar"; // Import Admin Sidebar component
import AdminNavbar from "./AdminNavbar"; // Import Admin Navbar component

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Admin Navbar */}
      <AdminNavbar setIsSidebarOpen={setIsSidebarOpen} />

      <div className="grid grid-cols-12 pt-16 h-full">
        {/* SIDEBAR — 2 COLUMNS ON DESKTOP */}
        <div className="hidden md:block md:col-span-2">
          <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* MOBILE SIDEBAR (slide-in) */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={true}
        />

        {/* MAIN CONTENT — 10 COLUMNS */}
        <main className="col-span-12 p-5 md:col-span-10 md:pl-8 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
