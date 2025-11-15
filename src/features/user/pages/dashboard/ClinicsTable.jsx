import React from 'react'

const ClinicsTable = () => {
  const clinics = [
    { name: 'Happy Clinic', address: 'Davao City', contact: '09871027946' },
    { name: 'City Care Clinic', address: 'Taal, Cavite City', contact: '09348203458' },
    { name: 'Wellness Hub', address: 'Manila, Davao City', contact: '09710864856' }
  ]

  return (
    <div className="table-card">
      <div className="table-title">Affiliated Clinics</div>
      <table>
        <thead>
          <tr>
            <th>Clinic Name</th>
            <th>Address</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((clinic, index) => (
            <tr key={index}>
              <td>{clinic.name}</td>
              <td>{clinic.address}</td>
              <td>{clinic.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClinicsTable