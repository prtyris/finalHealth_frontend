import { Bars3Icon } from "@heroicons/react/24/solid";
import finalHealthLogo from "../../../assets/logo.png";

export default function Navbar({ setIsSidebarOpen }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-40 flex items-center px-4 md:px-6">
      {/* Hamburger for mobile */}
      <button className="md:hidden mr-4" onClick={() => setIsSidebarOpen(true)}>
        <Bars3Icon className="h-7 text-gray-700" />
      </button>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={finalHealthLogo}
          alt="FinaleHealth Logo"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="font-semibold text-lg text-blue-600">FinalHealth</span>
      </div>
    </header>
  );
}
