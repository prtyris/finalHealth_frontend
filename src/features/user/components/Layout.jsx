import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-full">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />

      <div className="grid grid-cols-12 pt-16 h-full">
        {/* SIDEBAR — 2 COLUMNS ON DESKTOP */}
        <div className="hidden md:block md:col-span-2 ">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* MOBILE SIDEBAR (slide-in) */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={true}
        />

        {/* MAIN CONTENT — 10 COLUMNS */}
        <main className="col-span-12 p-5 md:col-span-10 md:pl-8 pb-10 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
