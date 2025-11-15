import React, { useState, useEffect } from "react";
import { loginUser, registerUser } from "../../../lib/user-api/userApi";

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Map login fields to correct keys
    const keyMap = {
      loginEmail: "email",
      loginPassword: "password",
      registerEmail: "email",
      registerPassword: "password",
    };

    const fieldKey = keyMap[id] || id;

    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));

    if (errors[fieldKey]) {
      setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === "login") {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.middleName)
        newErrors.middleName = "Middle name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email || !formData.email.includes("@"))
        newErrors.email = "Enter a valid email";
      if (!formData.contactNumber)
        newErrors.contactNumber = "Contact number is required";
      if (formData.password.length < 6)
        newErrors.password = "Minimum 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // LOGIN FLOW
    if (mode === "login") {
      const res = await loginUser(formData.email, formData.password);

      if (!res || res.error || res.message === "Invalid credentials") {
        setErrors({ password: "Invalid email or password" });
        setLoading(false);
        return;
      }

      localStorage.setItem("user_token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setLoading(false);
      onClose();
      return;
    }

    // REGISTER FLOW
    if (mode === "register") {
      const payload = {
        f_name: formData.firstName,
        m_name: formData.middleName,
        l_name: formData.lastName,
        email: formData.email,
        contact_num: formData.contactNumber,
        password: formData.password,
      };

      const res = await registerUser(payload);

      if (!res?.success) {
        setErrors({ email: res.error || "Registration failed" });
        setLoading(false);
        return;
      }

      // Switch to login after successful registration
      setLoading(false);
      onSwitchMode("login");
      return;
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
            <div className="w-4 h-5 bg-blue-600 border-2 border-white rounded-sm relative">
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1/2 transform -translate-x-1/2 shadow-[0_-3px_0_white,0_-6px_0_white,0_3px_0_white]"></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            FinalHealth
          </span>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="loginEmail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="loginEmail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchMode("register")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Create Account
                </button>
              </span>
            </div>
          </form>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {["firstName", "middleName", "lastName"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")}
                    *
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                      errors[field]
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder={`Enter your ${field
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="registerEmail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="registerEmail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Contact Number*
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.contactNumber
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Enter your contact number"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="registerPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password*
                </label>
                <input
                  type="password"
                  id="registerPassword"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirm Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>

            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchMode("login")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Login
                </button>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
