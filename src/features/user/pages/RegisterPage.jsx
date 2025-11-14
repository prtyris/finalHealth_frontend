import { useState } from "react";
import { registerUser } from "../../../lib/user-api/userApi.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    f_name: "",
    m_name: "",
    l_name: "",
    email: "",
    contact_num: "",
    password: "",
    confirmPassword: "",
    address: "",
    birth_date: "",
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMsg("❌ Passwords do not match");
      return;
    }

    const payload = {
      f_name: form.f_name,
      m_name: form.m_name,
      l_name: form.l_name,
      email: form.email,
      contact_num: form.contact_num,
      password: form.password,
      address: form.address,
      birth_date: form.birth_date,
    };

    const data = await registerUser(payload);

    if (data?.success) {
      setMsg("✅ Registered successfully! Redirecting...");
      setTimeout(() => navigate("/user/login"), 1000);
    } else {
      setMsg(data?.error || data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-teal-400 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md h-[90vh] overflow-y-auto">
        {msg && (
          <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2 shadow-md z-50">
            {msg}
          </div>
        )}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* FIRST NAME */}
          <div>
            <label className="text-sm font-semibold">First Name*</label>
            <p className="text-xs text-gray-500 mb-1">Enter your given name.</p>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              name="f_name"
              value={form.f_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* MIDDLE NAME */}
          <div>
            <label className="text-sm font-semibold">Middle Name*</label>
            <p className="text-xs text-gray-500 mb-1">
              Use N/A if not applicable.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              name="m_name"
              value={form.m_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="text-sm font-semibold">Last Name*</label>
            <p className="text-xs text-gray-500 mb-1">
              Your family name or surname.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              name="l_name"
              value={form.l_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email*</label>
            <p className="text-xs text-gray-500 mb-1">
              This will be your login email.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONTACT NUMBER */}
          <div>
            <label className="text-sm font-semibold">Contact Number*</label>
            <p className="text-xs text-gray-500 mb-1">
              Use a valid phone number.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              name="contact_num"
              value={form.contact_num}
              onChange={handleChange}
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm font-semibold">Address*</label>
            <p className="text-xs text-gray-500 mb-1">
              Format: Street, City, Province, Country.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* BIRTH DATE */}
          <div>
            <label className="text-sm font-semibold">Birth Date*</label>
            <p className="text-xs text-gray-500 mb-1">Select date of birth.</p>
            <input
              className="w-full border rounded px-3 py-2"
              type="date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold">Password*</label>
            <p className="text-xs text-gray-500 mb-1">
              Minimum of 8 characters.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-semibold">Confirm Password*</label>
            <p className="text-xs text-gray-500 mb-1">
              Make sure both passwords match.
            </p>
            <input
              className="w-full border rounded px-3 py-2"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">
            Create Account
          </button>
          <div
            onClick={() => navigate("/")}
            className="w-full border-2 text-center border-black text-black py-2 rounded mt-2"
          >
            Back to login
          </div>
        </form>
      </div>
    </div>
  );
}
