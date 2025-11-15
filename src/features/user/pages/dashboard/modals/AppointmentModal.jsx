import React from 'react'

const AppointmentModal = ({ appointment, onClose, onStartConsultation }) => {
  if (!appointment) return null

  return (
    <div className="modal active" id="appointmentModal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Appointment Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="appointment-details">
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{appointment.date}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time:</span>
              <span className="detail-value">{appointment.time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">
                <span className={`status-badge status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Clinic:</span>
              <span className="detail-value">{appointment.clinic}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{appointment.type}</span>
            </div>
          </div>
          <div className="patient-info">
            <h4>Patient Information</h4>
            <div className="appointment-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{appointment.patient.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{appointment.patient.age}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{appointment.patient.contact}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Reason:</span>
                <span className="detail-value">{appointment.patient.reason}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="action-btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="action-btn btn-danger">
            Cancel Appointment
          </button>
          <button className="action-btn btn-primary" onClick={onStartConsultation}>
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal