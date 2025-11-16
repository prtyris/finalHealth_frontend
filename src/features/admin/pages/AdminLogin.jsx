import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await adminLogin(email, password);

    if (res?.token) {
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin", JSON.stringify(res.admin));
      navigate("/admin/dashboard");
    } else {
      setMsg(res?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-teal-400 px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mb-2">
            <div className="w-6 h-7 bg-blue-600 border-2 border-white rounded-sm relative">
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1/2 -translate-x-1/2 shadow-[0_-3px_0_white,0_-6px_0_white,0_3px_0_white]"></div>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-blue-700">FinalHealth</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Password"
            required
          />

          <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition">
            Login
          </button>
          <p className="text-center text-blue-700 mt-3">
            Don’t have an admin account?{" "}
            <span
              onClick={() => navigate("/admin/admin-register")}
              className="font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </form>

        {msg && <p className="text-center text-sm text-red-600 mt-4">{msg}</p>}
      </div>
    </div>
  );
}
