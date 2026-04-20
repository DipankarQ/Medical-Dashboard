import React from 'react'

function PatientSidebar({ patients, selectedPatient, onPatientSelect }) {
  return (
    <aside className="patient-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Patients</h2>
        <button className="search-icon" aria-label="Search patients">🔍</button>
      </div>
      
      <div className="patient-list">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`patient-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
            onClick={() => onPatientSelect(patient)}
          >
            <img
              src={patient.profileImage || `https://i.pravatar.cc/150?img=${patient.id}`}
              alt={patient.name}
              className="patient-avatar"
            />
            <div className="patient-info">
              <div className="patient-name">{patient.name}</div>
              <div className="patient-meta">{patient.gender}, {patient.age}</div>
            </div>
            <button className="patient-menu" aria-label="More options">⋯</button>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default PatientSidebar

