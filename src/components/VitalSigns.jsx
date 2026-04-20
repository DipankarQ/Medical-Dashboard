import React from 'react'

function VitalSigns({ patient }) {
  if (!patient || !patient.vitalSigns) {
    return null
  }

  const { respiratoryRate, temperature, heartRate } = patient.vitalSigns

  const vitalSignsCards = [
    {
      label: 'Respiratory Rate',
      value: respiratoryRate.value,
      unit: respiratoryRate.unit,
      status: respiratoryRate.status,
      icon: '🫁',
    },
    {
      label: 'Temperature',
      value: temperature.value,
      unit: temperature.unit,
      status: temperature.status,
      icon: '🌡️',
    },
    {
      label: 'Heart Rate',
      value: heartRate.value,
      unit: heartRate.unit,
      status: heartRate.status,
      icon: '❤️',
    },
  ]

  return (
    <div className="vital-signs-container">
      {vitalSignsCards.map((vital, index) => (
        <div key={index} className="vital-sign-card">
          <div className="vital-icon">{vital.icon}</div>
          <div className="vital-content">
            <div className="vital-label">{vital.label}</div>
            <div className="vital-value">
              {vital.value}{vital.unit}
            </div>
            <div className={`vital-status ${vital.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {vital.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VitalSigns

