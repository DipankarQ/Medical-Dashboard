import React from 'react'

function PatientDetails({ patient }) {
  if (!patient) {
    return (
      <div className="patient-details-card">
        <div className="card-content">
          <p>No patient selected</p>
        </div>
      </div>
    )
  }

  const details = [
    { icon: '📅', label: 'Date of Birth', value: patient.dob },
    { icon: '⚥', label: 'Gender', value: patient.gender },
    { icon: '📞', label: 'Contact Info', value: patient.contact },
    { icon: '🚨', label: 'Emergency Contacts', value: patient.emergencyContact },
    { icon: '🏥', label: 'Insurance Provider', value: patient.insuranceProvider },
  ]

  return (
    <div className="patient-details-card">
      <div className="card-content">
        <div className="patient-profile-large">
          <img
            src={patient.profileImage || `https://i.pravatar.cc/150?img=${patient.id}`}
            alt={patient.name}
            className="patient-profile-image-large"
          />
          <h2 className="patient-name-large">{patient.name}</h2>
        </div>
        
        <div className="patient-details-list">
          {details.map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-icon">{detail.icon}</span>
              <div className="detail-content">
                <span className="detail-label">{detail.label}</span>
                <span className="detail-value">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="show-all-button">Show All Information</button>
      </div>
    </div>
  )
}

export default PatientDetails

