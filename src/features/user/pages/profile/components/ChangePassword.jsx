import React, { useState, useEffect } from "react";
import { updateUserSettings } from "../../../../../api/profileApi";
import AlertModal from "../../../../../components/AlertModal";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthColor, setStrengthColor] = useState("#ea4335");
  const [strengthText, setStrengthText] = useState("None");

  // Activity history state
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, action: "Password Changed", time: "January 25, 2026 at 2:30 PM", icon: "key" },
    { id: 2, action: "Login from new device", time: "January 15, 2026 at 9:20 AM", icon: "sign-in-alt" },
    { id: 3, action: "Two-factor enabled", time: "January 10, 2026 at 3:15 PM", icon: "shield-alt" },
  ]);

  // Password requirements state
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  // Calculate password strength and requirements
  useEffect(() => {
    if (!newPass) {
      setPasswordStrength(0);
      setStrengthColor("#ea4335");
      setStrengthText("None");
      setRequirements({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
      });
      return;
    }

    // Check requirements
    const lengthReq = newPass.length >= 8;
    const uppercaseReq = /[A-Z]/.test(newPass);
    const lowercaseReq = /[a-z]/.test(newPass);
    const numberReq = /[0-9]/.test(newPass);

    setRequirements({
      length: lengthReq,
      uppercase: uppercaseReq,
      lowercase: lowercaseReq,
      number: numberReq,
    });

    // Calculate strength
    let strength = 0;
    if (lengthReq) strength += 25;
    if (uppercaseReq) strength += 25;
    if (lowercaseReq) strength += 25;
    if (numberReq) strength += 25;

    setPasswordStrength(strength);

    // Update color and text based on strength
    if (strength === 0) {
      setStrengthColor("#ea4335");
      setStrengthText("None");
    } else if (strength < 50) {
      setStrengthColor("#ea4335");
      setStrengthText("Weak");
    } else if (strength < 75) {
      setStrengthColor("#fbbc05");
      setStrengthText("Fair");
    } else if (strength < 100) {
      setStrengthColor("#34a853");
      setStrengthText("Good");
    } else {
      setStrengthColor("#34a853");
      setStrengthText("Strong");
    }
  }, [newPass]);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false }), 3000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const addActivity = (action, icon = "key") => {
    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }) + " at " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newActivity = {
      id: Date.now(),
      action,
      time: timeString,
      icon
    };

    setActivityHistory(prev => [newActivity, ...prev.slice(0, 3)]);
  };

  const handleSave = async () => {
    // Validation
    if (!current || !newPass || !confirm) {
      return showAlert("error", "Please fill all password fields");
    }

    if (newPass !== confirm) {
      return showAlert("error", "New password and confirmation do not match");
    }

    if (newPass.length < 8) {
      return showAlert("error", "Password must be at least 8 characters");
    }

    const payload = {
      currentPassword: current,
      newPassword: newPass,
    };

    try {
      const res = await updateUserSettings(payload);

      if (!res.success) return showAlert("error", res.error);

      showAlert("success", "Password updated successfully");
      addActivity("Password Changed", "key");

      // Clear fields
      setCurrent("");
      setNewPass("");
      setConfirm("");
      setPasswordStrength(0);
      setStrengthText("None");
    } catch (error) {
      showAlert("error", "Failed to update password. Please try again.");
    }
  };

  const handleCancel = () => {
    setCurrent("");
    setNewPass("");
    setConfirm("");
    setPasswordStrength(0);
    setStrengthText("None");
    setRequirements({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
    });
  };

  return (
    <div className="change-password-container">
      <style jsx>{`
        .change-password-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        @media (min-width: 992px) {
          .change-password-container {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        /* Password Card */
        .password-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 30px;
          transition: all 0.3s ease;
        }
        
        .password-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #202124;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e8f0fe;
        }
        
        .section-title i {
          color: #1a73e8;
          font-size: 22px;
        }
        
        .form-group {
          margin-bottom: 25px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 500;
          color: #202124;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .form-label i {
          color: #5f6368;
          font-size: 16px;
        }
        
        /* FIXED: Input with eye button inside */
        .input-wrapper {
          position: relative;
          width: 100%;
        }
        
        .password-input {
          width: 100%;
          padding: 12px 45px 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 15px;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
          color: #202124;
          box-sizing: border-box;
        }
        
        .password-input:focus {
          outline: none;
          border-color: #1a73e8;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
        }
        
        .password-input::placeholder {
          color: #9aa0a6;
        }
        
        /* FIXED: Eye button positioned INSIDE the input */
        .eye-toggle-button {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
          color: #5f6368;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          transition: all 0.2s ease;
          z-index: 2;
        }
        
        .eye-toggle-button:hover {
          background-color: #f1f3f4;
          color: #202124;
        }
        
        /* Hide default browser icons */
        .password-input::-ms-reveal,
        .password-input::-ms-clear {
          display: none;
        }
        
        .input-hint {
          font-size: 13px;
          color: #5f6368;
          margin-top: 8px;
          padding-left: 8px;
          font-style: italic;
        }
        
        /* Password Strength */
        .password-strength-container {
          margin-top: 15px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          border-left: 4px solid #1a73e8;
        }
        
        .strength-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .strength-label {
          font-size: 14px;
          font-weight: 500;
          color: #202124;
        }
        
        .strength-value {
          font-size: 14px;
          font-weight: 600;
          color: ${strengthColor};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .strength-meter {
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 15px;
        }
        
        .strength-fill {
          height: 100%;
          border-radius: 4px;
          transition: all 0.5s ease;
          width: ${passwordStrength}%;
          background-color: ${strengthColor};
        }
        
        /* Requirements - FIXED: Centered icons */
        .requirements-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #202124;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .requirement-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .requirement-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          position: relative;
          flex-shrink: 0;
        }
        
        /* Perfectly center the icons */
        .requirement-icon i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          line-height: 1;
        }
        
        .requirement-met {
          background-color: #34a853;
          color: white;
        }
        
        .requirement-not-met {
          background-color: #ea4335;
          color: white;
        }
        
        .requirement-text {
          color: #5f6368;
        }
        
        /* Buttons */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e8f0fe;
        }
        
        .cancel-btn, .save-btn {
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
        }
        
        .cancel-btn {
          background-color: #f1f3f4;
          color: #5f6368;
        }
        
        .cancel-btn:hover {
          background-color: #e8eaed;
          color: #202124;
        }
        
        .save-btn {
          background-color: #1a73e8;
          color: white;
        }
        
        .save-btn:hover:not(:disabled) {
          background-color: #0d62d9;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(26, 115, 232, 0.25);
        }
        
        .save-btn:disabled {
          background-color: #a0c3f0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        /* Activity Card */
        .activity-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 30px;
          transition: all 0.3s ease;
        }
        
        .activity-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        
        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 18px;
          border-bottom: 1px solid #e8f0fe;
          transition: all 0.2s ease;
        }
        
        .activity-item:last-child {
          border-bottom: none;
        }
        
        .activity-item:hover {
          background-color: #f8f9fa;
          border-radius: 10px;
        }
        
        .activity-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 50%;
          background-color: #e8f0fe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a73e8;
          font-size: 18px;
        }
        
        .activity-details h4 {
          font-size: 16px;
          margin-bottom: 4px;
          font-weight: 500;
          color: #202124;
        }
        
        .activity-details p {
          font-size: 14px;
          color: #5f6368;
        }
        
        /* Security Tips */
        .security-tips {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e8f0fe;
        }
        
        .tips-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #202124;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #5f6368;
          line-height: 1.5;
        }
        
        .tip-item i {
          color: #1a73e8;
          margin-top: 2px;
        }
        
        /* Alert Modal */
        .alert-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .success-message {
          position: fixed;
          top: 30px;
          right: 30px;
          background-color: #34a853;
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          animation: slideIn 0.4s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(150%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 640px) {
          .change-password-container {
            padding: 15px;
            gap: 20px;
          }
          
          .password-card,
          .activity-card {
            padding: 20px;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .cancel-btn,
          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Font Awesome CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <AlertModal
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />

      {alert.show && alert.type === "success" && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <span>{alert.message}</span>
        </div>
      )}

      {/* Password Card */}
      <div className="password-card">
        <h2 className="section-title">
          <i className="fas fa-key"></i>
          Change Password
        </h2>
        
        {/* Current Password */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-lock"></i>
            Current Password
          </label>
          <div className="input-wrapper">
            <input
              type={showPassword.current ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="password-input"
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="eye-toggle-button"
              onClick={() => togglePasswordVisibility("current")}
              aria-label={showPassword.current ? "Hide password" : "Show password"}
            >
              <i className={`fas fa-eye${showPassword.current ? '' : '-slash'}`}></i>
            </button>
          </div>
          <p className="input-hint">
            Enter your current password to verify your identity
          </p>
        </div>
        
        {/* New Password */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-plus-circle"></i>
            New Password
          </label>
          <div className="input-wrapper">
            <input
              type={showPassword.new ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="password-input"
              placeholder="Create a strong new password"
            />
            <button
              type="button"
              className="eye-toggle-button"
              onClick={() => togglePasswordVisibility("new")}
              aria-label={showPassword.new ? "Hide password" : "Show password"}
            >
              <i className={`fas fa-eye${showPassword.new ? '' : '-slash'}`}></i>
            </button>
          </div>
          
          <div className="password-strength-container">
            <div className="strength-header">
              <span className="strength-label">Password Strength</span>
              <span className="strength-value">{strengthText}</span>
            </div>
            
            <div className="strength-meter">
              <div className="strength-fill"></div>
            </div>
            
            <h4 className="requirements-title">
              <i className="fas fa-list-check"></i>
              Password Requirements:
            </h4>
            <ul className="requirements-list">
              <li className="requirement-item">
                <div className={`requirement-icon ${requirements.length ? 'requirement-met' : 'requirement-not-met'}`}>
                  <i className={`fas fa-${requirements.length ? 'check' : 'times'}`}></i>
                </div>
                <span className="requirement-text">At least 8 characters</span>
              </li>
              <li className="requirement-item">
                <div className={`requirement-icon ${requirements.uppercase ? 'requirement-met' : 'requirement-not-met'}`}>
                  <i className={`fas fa-${requirements.uppercase ? 'check' : 'times'}`}></i>
                </div>
                <span className="requirement-text">One uppercase letter</span>
              </li>
              <li className="requirement-item">
                <div className={`requirement-icon ${requirements.lowercase ? 'requirement-met' : 'requirement-not-met'}`}>
                  <i className={`fas fa-${requirements.lowercase ? 'check' : 'times'}`}></i>
                </div>
                <span className="requirement-text">One lowercase letter</span>
              </li>
              <li className="requirement-item">
                <div className={`requirement-icon ${requirements.number ? 'requirement-met' : 'requirement-not-met'}`}>
                  <i className={`fas fa-${requirements.number ? 'check' : 'times'}`}></i>
                </div>
                <span className="requirement-text">One number</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label">
            <i className="fas fa-check-double"></i>
            Confirm New Password
          </label>
          <div className="input-wrapper">
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="password-input"
              placeholder="Re-enter your new password"
            />
            <button
              type="button"
              className="eye-toggle-button"
              onClick={() => togglePasswordVisibility("confirm")}
              aria-label={showPassword.confirm ? "Hide password" : "Show password"}
            >
              <i className={`fas fa-eye${showPassword.confirm ? '' : '-slash'}`}></i>
            </button>
          </div>
          <p className="input-hint">
            Must match the new password exactly
          </p>
        </div>
        
        {/* Buttons */}
        <div className="form-actions">
          <button className="cancel-btn" onClick={handleCancel}>
            <i className="fas fa-times"></i>
            Clear All
          </button>
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={!current || !newPass || !confirm || passwordStrength < 100}
          >
            <i className="fas fa-key"></i>
            Update Password
          </button>
        </div>
      </div>
      
      {/* Activity Card */}
      <div className="activity-card">
        <h2 className="section-title">
          <i className="fas fa-shield-alt"></i>
          Security Activity
        </h2>
        
        <div className="activity-section">
          {activityHistory.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <i className={`fas fa-${activity.icon}`}></i>
              </div>
              <div className="activity-details">
                <h4>{activity.action}</h4>
                <p>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="security-tips">
          <h3 className="tips-title">
            <i className="fas fa-lightbulb"></i>
            Security Tips
          </h3>
          <ul className="tips-list">
            <li className="tip-item">
              <i className="fas fa-check-circle"></i>
              <span>Use a unique password for this account</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check-circle"></i>
              <span>Avoid using personal information in passwords</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check-circle"></i>
              <span>Consider using a password manager</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check-circle"></i>
              <span>Enable two-factor authentication for added security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;