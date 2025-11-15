import React, { useState } from 'react'
import StatsGrid from './StatsGrid'
import ChartSection from './ChartSection'
import ClinicsTable from './ClinicsTable'
import AppointmentModal from './modals/AppointmentModal'
import ConsultationModal from './modals/ConsultationModal'
import SummaryModal from './modals/SummaryModal'
import SuccessModal from './modals/SuccessModal'

const Dashboard = ({ onToggleDarkMode, darkMode }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [consultationData, setConsultationData] = useState({})

  // Sample data
  const appointments = [
    {
      id: 1,
      date: "Oct 28, 2025",
      time: "10:00 AM - 11:00 AM",
      status: "Upcoming",
      clinic: "Happy Clinic",
      type: "General Consultation",
      patient: {
        name: "John Doe",
        age: "35 years old",
        contact: "+63 912 345 6789",
        reason: "Regular checkup and consultation"
      }
    },
    {
      id: 2,
      date: "Oct 29, 2025",
      time: "02:00 PM - 03:00 PM",
      status: "Upcoming",
      clinic: "City Care Clinic",
      type: "Follow-up Visit",
      patient: {
        name: "Jane Smith",
        age: "28 years old",
        contact: "+63 923 456 7890",
        reason: "Follow-up for previous treatment"
      }
    }
  ]

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setActiveModal('appointment')
  }

  const handleStartConsultation = () => {
    setActiveModal('consultation')
  }

  const handleCompleteConsultation = (data) => {
    setConsultationData(data)
    setActiveModal('summary')
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setSelectedAppointment(null)
  }

  const handleCloseSummary = () => {
    setActiveModal('success')
  }

  const handleCloseSuccess = () => {
    setActiveModal(null)
    setConsultationData({})
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>Doctor Dashboard</h1>
        <button className="theme-toggle" onClick={onToggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Chart and Appointments */}
      <ChartSection 
        appointments={appointments}
        onViewAppointment={handleViewAppointment}
      />

      {/* Clinics Table */}
      <ClinicsTable />

      {/* Modals */}
      {activeModal === 'appointment' && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onStartConsultation={handleStartConsultation}
        />
      )}

      {activeModal === 'consultation' && (
        <ConsultationModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onComplete={handleCompleteConsultation}
        />
      )}

      {activeModal === 'summary' && (
        <SummaryModal
          appointment={selectedAppointment}
          consultationData={consultationData}
          onClose={handleCloseModal}
          onPrint={() => window.print()}
          onEmail={() => alert('📧 Consultation summary has been sent to the patient\'s email address.')}
          onDone={handleCloseSummary}
        />
      )}

      {activeModal === 'success' && (
        <SuccessModal
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  )
}

export default Dashboard