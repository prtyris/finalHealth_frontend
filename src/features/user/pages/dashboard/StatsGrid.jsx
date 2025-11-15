import React from 'react'

const StatsGrid = () => {
  const stats = [
    { label: 'Total Clinics', value: '4' },
    { label: 'Appointments (This Month)', value: '56' },
    { label: 'Completed', value: '48' },
    { label: 'Cancelled', value: '8' },
    { label: 'Upcoming', value: '12' },
    { 
      label: 'Current Plan', 
      value: 'Pro Plan',
      subLabel: 'Renews on: Jan 15, 2025'
    }
  ]

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-label">{stat.label}</div>
          <div 
            className="stat-value" 
            style={stat.subLabel ? { fontSize: '18px' } : {}}
          >
            {stat.value}
          </div>
          {stat.subLabel && (
            <div className="stat-label">{stat.subLabel}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default StatsGrid