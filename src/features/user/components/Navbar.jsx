import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 ml-64 fixed top-0 right-0 left-64 z-20">
      <span className="font-semibold text-gray-700">
        {user ? user.f_name + " " + user.l_name : "User"}
      </span>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
