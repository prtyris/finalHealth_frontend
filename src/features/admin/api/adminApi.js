const API_BASE = import.meta.env.VITE_API_BASE;

// Example simple auth calls for testing
export const adminLogin = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ Login error:", err.message);
    return { error: "Network error" };
  }
};

export const adminRegister = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/admin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("❌ Register error:", err.message);
    return { error: "Network error" };
  }
};
