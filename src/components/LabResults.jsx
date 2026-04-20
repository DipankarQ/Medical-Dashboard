import React from 'react'

function LabResults({ patient }) {
  if (!patient || !patient.labResults) {
    return (
      <div className="lab-results-card">
        <div className="card-header">
          <h3>Lab Results</h3>
        </div>
        <div className="card-content">
          <p>No lab results available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lab-results-card">
      <div className="card-header">
        <h3>Lab Results</h3>
      </div>
      <div className="card-content">
        <div className="lab-results-list">
          {patient.labResults.map((result, index) => (
            <div key={index} className="lab-result-item">
              <span className="lab-result-name">{result}</span>
              <button className="download-icon" aria-label={`Download ${result}`}>
                ⬇️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LabResults

