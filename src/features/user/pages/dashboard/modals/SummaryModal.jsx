import React from 'react'

const SummaryModal = ({ appointment, consultationData, onClose, onPrint, onEmail, onDone }) => {
  if (!appointment || !consultationData) return null

  const consultDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  })

  return (
    <div className="summary-modal active">
      <div className="summary-content">
        <div className="summary-header">
          <h2>✅ Consultation Completed</h2>
          <div className="summary-subtitle">
            Patient: {appointment.patient.name} | {consultDate}
          </div>
        </div>
        
        <div className="summary-body">
          <div className="success-badge">
            <span>✓</span>
            <span>Consultation recorded successfully</span>
          </div>

          {/* Patient Info */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>👤</span>
              <span>Patient Information</span>
            </div>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-card-label">Patient Name</div>
                <div className="summary-card-value">{appointment.patient.name}</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Age</div>
                <div className="summary-card-value">{appointment.patient.age}</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Consultation Duration</div>
                <div className="summary-card-value">{consultationData.duration}</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Date & Time</div>
                <div className="summary-card-value">
                  {consultDate} at {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>❤️</span>
              <span>Vital Signs</span>
            </div>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-card-label">Blood Pressure</div>
                <div className="summary-card-value">
                  {consultationData.vitalSigns?.bp || 'N/A'} mmHg
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Heart Rate</div>
                <div className="summary-card-value">
                  {consultationData.vitalSigns?.hr || 'N/A'}
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Temperature</div>
                <div className="summary-card-value">
                  {consultationData.vitalSigns?.temp || 'N/A'}
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Weight</div>
                <div className="summary-card-value">
                  {consultationData.vitalSigns?.weight || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>📝</span>
              <span>Chief Complaint</span>
            </div>
            <div className="summary-content-text">
              {consultationData.symptoms || appointment.patient.reason || 'No symptoms noted.'}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>🔍</span>
              <span>Diagnosis</span>
            </div>
            <div className="summary-content-text">
              {consultationData.diagnosis ? 
                `${consultationData.diagnosis}${consultationData.notes ? ` - ${consultationData.notes}` : ''}` 
                : 'No diagnosis entered.'
              }
            </div>
          </div>

          {/* Prescription */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>💊</span>
              <span>Prescription</span>
            </div>
            <div>
              {consultationData.prescriptions?.length > 0 ? (
                consultationData.prescriptions.map((pres, index) => (
                  <div key={index} className="prescription-summary">
                    <div className="prescription-summary-name">{pres.name}</div>
                    <div className="prescription-summary-details">{pres.details}</div>
                  </div>
                ))
              ) : (
                <div className="summary-content-text">No prescriptions issued.</div>
              )}
            </div>
          </div>

          {/* Lab Tests */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>🧪</span>
              <span>Lab Tests Ordered</span>
            </div>
            <div className="summary-content-text">
              {consultationData.labTests?.length > 0 ? (
                consultationData.labTests.map(test => `• ${test}`).join('<br>')
              ) : (
                'No lab tests ordered.'
              )}
            </div>
          </div>

          {/* Follow-up */}
          <div className="summary-section">
            <div className="summary-section-title">
              <span>📅</span>
              <span>Follow-up</span>
            </div>
            <div className="summary-content-text">
              {consultationData.followupDate && (
                <><strong>Next Appointment:</strong> {consultationData.followupDate}<br/></>
              )}
              <strong>Instructions:</strong> {consultationData.instructions || 'Follow standard care guidelines.'}
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <button className="action-btn btn-secondary" onClick={onPrint}>
            <span className="print-icon">🖨️</span> Print Report
          </button>
          <button className="action-btn btn-success" onClick={onEmail}>
            <span className="print-icon">✉️</span> Email to Patient
          </button>
          <button className="action-btn btn-primary" onClick={onDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryModal