import {
  HomeIcon,
  UsersIcon,
  CheckIcon, // For Verify Doctors
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid"; // Import the necessary icons

import Logo from "../../../assets/logo.png"; // Assuming you have the same logo for admin

export default function AdminSidebar({ isOpen, setIsOpen, isMobile = false }) {
  const admin = JSON.parse(localStorage.getItem("admin")); // Get the admin data from localStorage

  const menu = [
    {
      name: "Dashboard",
      icon: <HomeIcon className="h-5" />,
      link: "/admin/admin-dashboard",
    },
    {
      name: "Users",
      icon: <UsersIcon className="h-5" />,
      link: "/admin/admin-users",
    },
    {
      name: "Verify Doctors",
      icon: <CheckIcon className="h-5" />, // CheckIcon for verification
      link: "/admin/admin-verify-doctors",
    },
    {
      name: "Subscribers",
      icon: <CreditCardIcon className="h-5" />,
      link: "/admin/admin-subscribers",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/40 z-20 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
            <img src={Logo} className="rounded-full" alt="Admin Logo" />
          </div>
          <p className="font-semibold">{admin?.email}</p>
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
              localStorage.removeItem("admin_token");
              localStorage.removeItem("admin");
              window.location.href = "/admin/admin-login"; // Redirect to login
            }}
          >
            <ArrowLeftOnRectangleIcon className="h-5" />
            <span>Logout</span>
          </button>

          <p className="mt-4 text-xs text-gray-500">{admin?.email}</p>
        </div>
      </aside>
    </>
  );
}
