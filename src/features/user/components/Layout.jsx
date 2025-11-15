import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 px-6 pb-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
