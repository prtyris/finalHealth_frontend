import { useState } from "react";
import { adminRegister } from "../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMsg("❌ Passwords do not match");
      return;
    }

    const payload = {
      fName: form.fName,
      lName: form.lName,
      email: form.email,
      password: form.password,
    };

    const res = await adminRegister(payload);

    if (res?.success) {
      setMsg("✅ Admin registered!");
      setTimeout(() => navigate("/admin/admin-login"), 1200);
    } else {
      setMsg(res?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-teal-400 px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-xl shadow-xl h-[92vh] overflow-y-auto">
        {/* Toast / Message */}
        {msg && (
          <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 shadow-md z-50">
            {msg}
          </div>
        )}

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mb-2">
            <div className="w-6 h-7 bg-blue-600 border-2 border-white rounded-sm relative">
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1/2 transform -translate-x-1/2 shadow-[0_-3px_0_white,0_-6px_0_white,0_3px_0_white]"></div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-blue-700">FinaleHealth</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* FIRST NAME */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              First Name*
            </label>
            <input
              name="fName"
              value={form.fName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter First Name"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Last Name*
            </label>
            <input
              name="lName"
              value={form.lName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Last Name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold block mb-1">Email*</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Password*
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-semibold block mb-1">
              Confirm Password*
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition">
            Create Account
          </button>

          <p className="text-center text-blue-700 mt-4">
            Already have an admin account?{" "}
            <span
              onClick={() => navigate("/admin/admin-login")}
              className="font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
