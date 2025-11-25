import React, { useState } from "react";

import Logo from "../../../assets/logo.png";

const Header = ({ darkMode, toggleDarkMode, openAuthModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => openAuthModal("login");
  const handleRegisterClick = () => openAuthModal("register");

  return (
    <nav
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        darkMode ? "dark:bg-gray-800 shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Circular Logo */}
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
              <img
                src="/src/assets/logo.png"
                alt="FinalHealth Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback if image doesn't load */}
              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm hidden">
                <img src={Logo} />
              </div>
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              FinalHealth
            </span>
          </div>

          {/* Hamburger (Mobile Only) */}
          <button
            className="md:hidden text-2xl focus:outline-none text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Home", "About", "Features", "Subscribe", "Contact Us"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                  : "bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
              <span className="font-medium">{darkMode ? "Light" : "Dark"}</span>
            </button>

            {/* Auth Buttons */}
            <button
              onClick={handleLoginClick}
              className={`px-6 py-2 rounded-lg border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            className={`mt-4 flex flex-col space-y-4 md:hidden transition-all duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {/* Mobile Links */}
            {["Home", "About", "Features", "Subscribe", "Contact Us"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-center"
                >
                  {item}
                </a>
              )
            )}

            {/* Mobile Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                  : "bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
              <span className="font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* Mobile Auth Buttons */}
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLoginClick();
              }}
              className={`w-full px-6 py-2 rounded-lg border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleRegisterClick();
              }}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
