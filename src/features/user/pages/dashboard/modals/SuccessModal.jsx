import React from 'react'

const SuccessModal = ({ onClose }) => {
  return (
    <div className="success-modal active">
      <div className="success-content">
        <h2>✅ Consultation Completed!</h2>
        <p>Patient records have been updated successfully.</p>
        <button className="success-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}

export default SuccessModal