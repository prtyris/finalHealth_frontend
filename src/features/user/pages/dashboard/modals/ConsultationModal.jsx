import React, { useState, useEffect } from 'react'

const ConsultationModal = ({ appointment, onClose, onComplete }) => {
  const [consultationStartTime] = useState(Date.now())
  const [timer, setTimer] = useState('00:00')
  const [formData, setFormData] = useState({
    vitalSigns: {
      bp: '120/80',
      hr: '72 bpm',
      temp: '36.6°C',
      weight: '70 kg'
    },
    symptoms: '',
    diagnosis: '',
    notes: '',
    prescriptions: [
      { name: 'Amoxicillin 500mg', details: '3x daily for 7 days | After meals' },
      { name: 'Paracetamol 500mg', details: 'As needed for fever | Max 4x daily' }
    ],
    labTests: [],
    followupDate: '',
    instructions: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - consultationStartTime
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      setTimer(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [consultationStartTime])

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleAddMedication = () => {
    const medName = prompt('Enter medication name:')
    if (!medName) return
    const dosage = prompt('Enter dosage and instructions:')
    if (!dosage) return

    setFormData(prev => ({
      ...prev,
      prescriptions: [
        ...prev.prescriptions,
        { name: medName, details: dosage }
      ]
    }))
  }

  const handleRemoveMedication = (index) => {
    if (confirm('Remove this medication?')) {
      setFormData(prev => ({
        ...prev,
        prescriptions: prev.prescriptions.filter((_, i) => i !== index)
      }))
    }
  }

  const handleLabTestChange = (test) => {
    setFormData(prev => ({
      ...prev,
      labTests: prev.labTests.includes(test)
        ? prev.labTests.filter(t => t !== test)
        : [...prev.labTests, test]
    }))
  }

  const handleComplete = () => {
    if (confirm('Are you sure you want to complete this consultation? All data will be saved.')) {
      const elapsed = Date.now() - consultationStartTime
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      const duration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      
      onComplete({
        ...formData,
        duration,
        timestamp: new Date().toISOString()
      })
    }
  }

  const handleClose = () => {
    if (confirm('Close consultation? Unsaved changes will be lost.')) {
      onClose()
    }
  }

  if (!appointment) return null

  return (
    <div className="consultation-modal active">
      <div className="consultation-content">
        <div className="consultation-header">
          <div>
            <h2>📋 Active Consultation</h2>
            <div className="patient-header">
              Patient: {appointment.patient.name} | {appointment.date}
            </div>
          </div>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <div className="consultation-body">
          {/* Left Column */}
          <div>
            {/* Vital Signs */}
            <div className="consultation-section">
              <div className="section-title">
                <span>❤️</span>
                <span>Vital Signs</span>
              </div>
              <div className="vital-signs">
                {Object.entries(formData.vitalSigns).map(([key, value]) => (
                  <div key={key} className="vital-card">
                    <div className="vital-label">
                      {key === 'bp' ? 'Blood Pressure' :
                       key === 'hr' ? 'Heart Rate' :
                       key === 'temp' ? 'Temperature' : 'Weight'}
                    </div>
                    <div 
                      className="vital-value" 
                      contentEditable
                      onBlur={(e) => handleInputChange('vitalSigns', key, e.target.textContent)}
                      suppressContentEditableWarning={true}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="consultation-section" style={{marginTop: '24px'}}>
              <div className="section-title">
                <span>📝</span>
                <span>Chief Complaint</span>
              </div>
              <div className="form-group">
                <label className="form-label">Symptoms</label>
                <textarea 
                  className="form-textarea" 
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({...prev, symptoms: e.target.value}))}
                  placeholder="Describe patient's symptoms..."
                />
              </div>
            </div>

            {/* Diagnosis */}
            <div className="consultation-section" style={{marginTop: '24px'}}>
              <div className="section-title">
                <span>🔍</span>
                <span>Diagnosis</span>
              </div>
              <div className="form-group">
                <label className="form-label">Primary Diagnosis</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.diagnosis}
                  onChange={(e) => setFormData(prev => ({...prev, diagnosis: e.target.value}))}
                  placeholder="Enter diagnosis..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea 
                  className="form-textarea" 
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                  placeholder="Additional notes..."
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Prescription */}
            <div className="consultation-section">
              <div className="section-title">
                <span>💊</span>
                <span>Prescription</span>
              </div>
              {formData.prescriptions.map((prescription, index) => (
                <div key={index} className="prescription-item">
                  <div className="prescription-header">
                    <span className="med-name">{prescription.name}</span>
                    <button 
                      className="remove-btn" 
                      onClick={() => handleRemoveMedication(index)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="med-details">{prescription.details}</div>
                </div>
              ))}
              <button className="add-med-btn" onClick={handleAddMedication}>
                + Add Medication
              </button>
            </div>

            {/* Lab Tests */}
            <div className="consultation-section" style={{marginTop: '24px'}}>
              <div className="section-title">
                <span>🧪</span>
                <span>Lab Tests Ordered</span>
              </div>
              <div className="form-group">
                <label className="form-label">Select Tests</label>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {['Complete Blood Count (CBC)', 'Urinalysis', 'Lipid Panel', 'Blood Glucose', 'X-Ray', 'ECG'].map(test => (
                    <label key={test} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <input
                        type="checkbox"
                        checked={formData.labTests.includes(test)}
                        onChange={() => handleLabTestChange(test)}
                      />
                      {test}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow-up */}
            <div className="consultation-section" style={{marginTop: '24px'}}>
              <div className="section-title">
                <span>📅</span>
                <span>Follow-up</span>
              </div>
              <div className="form-group">
                <label className="form-label">Follow-up Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={formData.followupDate}
                  onChange={(e) => setFormData(prev => ({...prev, followupDate: e.target.value}))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Instructions</label>
                <textarea 
                  className="form-textarea" 
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({...prev, instructions: e.target.value}))}
                  placeholder="Post-consultation instructions..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="consultation-footer">
          <div className="timer">
            <span>⏱️</span>
            <span>Duration:</span>
            <span className="timer-value">{timer}</span>
          </div>
          <div style={{flex: 1}}></div>
          <button className="action-btn btn-secondary" onClick={onClose}>
            Save as Draft
          </button>
          <button className="action-btn btn-primary" onClick={handleComplete}>
            Complete Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsultationModal