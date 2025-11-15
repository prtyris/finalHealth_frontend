import React from 'react'

const ChartSection = ({ appointments, onViewAppointment }) => {
  const chartData = [
    { label: 'Week 1', height: '55%' },
    { label: 'Week 2', height: '80%' },
    { label: 'Week 3', height: '75%' },
    { label: 'Week 4', height: '45%' }
  ]

  return (
    <div className="chart-section">
      {/* Chart Card */}
      <div className="chart-card">
        <div className="chart-header">
          <span className="chart-title">Appointments - This Month (% week)</span>
          <span className="chart-filter">Bar Chart</span>
        </div>
        <div className="chart">
          {chartData.map((data, index) => (
            <div 
              key={index}
              className="bar" 
              style={{ height: data.height }}
            >
              <span className="bar-label">{data.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments Card */}
      <div className="chart-card" id="appointmentsCard">
        <div className="appointments-header">Upcoming Appointments</div>
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <div>
              <div className="appointment-date">{appointment.date}</div>
              <div className="appointment-time">{appointment.time}</div>
            </div>
            <button 
              className="view-btn"
              onClick={() => onViewAppointment(appointment)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChartSection