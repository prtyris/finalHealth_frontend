import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../lib/user-api/userApi.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data?.token) {
      // HARD RESET — remove old user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userInformations");

      // SAVE NEW TOKEN
      localStorage.setItem("token", data.token);

      // SAVE NEW USER OBJECT
      localStorage.setItem("user", JSON.stringify(data.user));

      // SAVE NEW USER INFORMATIONS (used by Sidebar + Profile page)
      localStorage.setItem(
        "userInformations",
        JSON.stringify({
          email: data.user.email,
          fullName: data.user.fullName,
          profileImage: data.user.profileImage,
        })
      );

      setMsg("✅ Login success!");
      navigate("/");
    } else {
      setMsg(data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
          {msg && <p className="text-center text-sm mt-2">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
