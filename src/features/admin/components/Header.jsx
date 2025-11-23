// /components/Header.jsx
import React from "react";

export default function Header({ title = "Dashboard" }) {
  return (
    <header className="w-full bg-white py-4 px-6 rounded-xl shadow-sm flex items-center justify-between">
      <div className="text-xl font-semibold">{title}</div>

      <div className="flex items-center gap-4">
        <input
          className="w-96 rounded-xl border border-gray-200 px-4 py-2"
          placeholder="Search..."
        />
      </div>
    </header>
  );
}
