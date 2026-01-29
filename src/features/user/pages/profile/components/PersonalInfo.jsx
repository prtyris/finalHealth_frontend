import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../../../context/users/useUser";
import { updateProfile } from "../../../../../api/profileApi";
import AlertModal from "../../../../../components/AlertModal";

const PersonalInfo = () => {
  const { userInfo, loading, error, getPersonalInfo } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const originalDataRef = useRef(null);

  // Load from provider
  useEffect(() => {
    getPersonalInfo();
  }, []);

  // Map provider data → local form state
  useEffect(() => {
    if (!userInfo) return;

    const { user, profile } = userInfo;

    const fullName = `${profile.fName} ${profile.mName} ${profile.lName}`
      .replace(/\s+/g, " ")
      .trim();

    localStorage.setItem(
      "userInformations",
      JSON.stringify({
        email: user.email,
        profileImage: profile.profileImgPath,
        fullName,
      }),
    );

    const newProfileData = {
      firstName: profile.fName,
      middleName: profile.mName,
      lastName: profile.lName,
      email: user.email,
      contactNumber: profile.contactNum,
      dateOfBirth: profile.birthDate?.substring(0, 10),
      address: profile.address,
    };

    setProfileData(newProfileData);
    originalDataRef.current = { ...newProfileData };
  }, [userInfo]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setProfileData({ ...originalDataRef.current });
    setEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!userInfo) return;

    setSaving(true);

    const payload = {
      fName: profileData.firstName,
      mName: profileData.middleName,
      lName: profileData.lastName,
      contactNum: profileData.contactNumber,
      birthDate: profileData.dateOfBirth,
      address: profileData.address,
    };

    try {
      const result = await updateProfile(userInfo.user.userId, payload);

      setSaving(false);
      setEditing(false);

      setAlert({
        show: true,
        type: result.success ? "success" : "error",
        message: result.success
          ? "Profile updated successfully!"
          : "Failed to update profile.",
      });

      if (result.success) {
        originalDataRef.current = { ...profileData };
        getPersonalInfo(); // Refresh data
      }
    } catch (error) {
      setSaving(false);
      setAlert({
        show: true,
        type: "error",
        message: "An error occurred while updating profile.",
      });
    }
  };

  // Show loading only when actually loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          background: "#fff5f5",
          borderRadius: "12px",
          border: "2px solid #fecaca",
          maxWidth: "500px",
          margin: "50px auto",
        }}
      >
        <div
          style={{ color: "#ef4444", fontSize: "48px", marginBottom: "20px" }}
        >
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h2 style={{ color: "#7f1d1d", marginBottom: "10px" }}>
          Error Loading Profile
        </h2>
        <p style={{ color: "#991b1b", marginBottom: "30px" }}>{error}</p>
        <button
          onClick={getPersonalInfo}
          style={{
            padding: "12px 24px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // If no profile data yet (but not loading), show minimal loading
  if (!profileData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div className="personal-info-container">
      <style jsx>{`
        .personal-info-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, sans-serif;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .header-section {
          margin-bottom: 40px;
        }

        .header-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .header-title i {
          color: #667eea;
          background: #e8f0fe;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .header-subtitle {
          font-size: 16px;
          color: #718096;
          line-height: 1.6;
          max-width: 800px;
        }

        .content-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .profile-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          color: white;
        }

        .profile-name {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-email {
          font-size: 18px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile-info {
          padding: 40px;
        }

        .info-section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #e8f0fe;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-title i {
          color: #667eea;
          font-size: 20px;
          width: 36px;
          height: 36px;
          background: #e8f0fe;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-label i {
          color: #667eea;
          font-size: 16px;
          width: 20px;
        }

        .info-value {
          padding: 14px 16px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          color: #2d3748;
          min-height: 52px;
          display: flex;
          align-items: center;
        }

        .info-input {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          color: #2d3748;
          background: white;
          width: 100%;
          font-family: inherit;
        }

        .info-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .info-input:disabled {
          background: #edf2f7;
          color: #4a5568;
          cursor: not-allowed;
        }

        textarea.info-input {
          min-height: 100px;
          resize: vertical;
          line-height: 1.5;
        }

        .actions-section {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding: 30px 40px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .action-button {
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 2px solid transparent;
          min-width: 140px;
          font-family: inherit;
        }

        .edit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .edit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .cancel-button {
          background: white;
          color: #4a5568;
          border-color: #cbd5e0;
        }

        .cancel-button:hover:not(:disabled) {
          background: #f7fafc;
          border-color: #a0aec0;
        }

        .save-button {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .save-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        /* Success Message */
        .success-message {
          position: fixed;
          top: 30px;
          right: 30px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out forwards;
          max-width: 400px;
        }

        /* Error Message */
        .error-message {
          position: fixed;
          top: 30px;
          right: 30px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out forwards;
          max-width: 400px;
        }

        /* Animations */
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .personal-info-container {
            padding: 20px 15px;
          }

          .header-title {
            font-size: 26px;
          }

          .profile-header {
            padding: 30px 20px;
          }

          .profile-name {
            font-size: 26px;
          }

          .profile-info {
            padding: 30px 20px;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .actions-section {
            padding: 25px 20px;
            flex-direction: column;
          }

          .action-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .header-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .profile-name {
            font-size: 22px;
          }

          .profile-email {
            font-size: 16px;
          }
        }
      `}</style>

      {/* Add Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Alert Modal */}
      {alert.show && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, type: "", message: "" })}
        />
      )}

      {/* Custom Success Message */}
      {alert.show && alert.type === "success" && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <span>{alert.message}</span>
        </div>
      )}

      {alert.show && alert.type === "error" && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <span>{alert.message}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="header-section">
        <h1 className="header-title">
          <i className="fas fa-user-circle"></i>
          Personal Information
        </h1>
        <p className="header-subtitle">
          Manage your personal details. All information is securely stored and
          encrypted.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="content-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <h2 className="profile-name">
              {profileData?.firstName} {profileData?.middleName}{" "}
              {profileData?.lastName}
            </h2>
            <div className="profile-email">
              <i className="fas fa-envelope"></i>
              <span>{profileData?.email}</span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="profile-info">
          {/* Name Information Section */}
          <div className="info-section">
            <h3 className="section-title">
              <i className="fas fa-signature"></i>
              Name Information
            </h3>

            <div className="info-grid">
              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-user"></i>
                  First Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={profileData?.firstName || ""}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter first name"
                  />
                ) : (
                  <div className="info-value">
                    {profileData?.firstName || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-user-tag"></i>
                  Middle Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={profileData?.middleName || ""}
                    onChange={(e) =>
                      handleInputChange("middleName", e.target.value)
                    }
                    placeholder="Enter middle name"
                  />
                ) : (
                  <div className="info-value">
                    {profileData?.middleName || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-users"></i>
                  Last Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    className="info-input"
                    value={profileData?.lastName || ""}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Enter last name"
                  />
                ) : (
                  <div className="info-value">
                    {profileData?.lastName || "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="info-section">
            <h3 className="section-title">
              <i className="fas fa-address-book"></i>
              Contact Information
            </h3>

            <div className="info-grid">
              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-envelope"></i>
                  Email Address
                </label>
                <div className="info-value">
                  {profileData?.email || "Not provided"}
                </div>
              </div>

              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-phone"></i>
                  Contact Number
                </label>
                {editing ? (
                  <input
                    type="tel"
                    className="info-input"
                    value={profileData?.contactNumber || ""}
                    onChange={(e) =>
                      handleInputChange("contactNumber", e.target.value)
                    }
                    placeholder="+63 XXX XXX XXXX"
                  />
                ) : (
                  <div className="info-value">
                    {profileData?.contactNumber || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-group">
                <label className="info-label">
                  <i className="fas fa-calendar-alt"></i>
                  Date of Birth
                </label>
                {editing ? (
                  <input
                    type="date"
                    className="info-input"
                    value={profileData?.dateOfBirth || ""}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                ) : (
                  <div className="info-value">
                    {profileData?.dateOfBirth
                      ? new Date(profileData.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-group" style={{ gridColumn: "1 / -1" }}>
                <label className="info-label">
                  <i className="fas fa-home"></i>
                  Address
                </label>
                {editing ? (
                  <textarea
                    className="info-input"
                    value={profileData?.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter your complete address"
                  />
                ) : (
                  <div
                    className="info-value"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {profileData?.address || "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          {!editing ? (
            <button
              className="action-button edit-button"
              onClick={handleEdit}
              disabled={saving}
            >
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="action-button cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>

              <button
                className="action-button save-button"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "14px",
          color: "#718096",
        }}
      >
        <p>
          <i
            className="fas fa-shield-alt"
            style={{ marginRight: "8px", color: "#667eea" }}
          ></i>
          Your information is secured with end-to-end encryption • Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
