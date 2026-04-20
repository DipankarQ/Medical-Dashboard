import React from 'react'

function DiagnosticList({ patient }) {
  if (!patient || !patient.diagnostics) {
    return (
      <div className="diagnostic-list-card">
        <div className="card-header">
          <h3>Diagnostic List</h3>
        </div>
        <div className="card-content">
          <p>No diagnostics available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="diagnostic-list-card">
      <div className="card-header">
        <h3>Diagnostic List</h3>
      </div>
      <div className="card-content">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {patient.diagnostics.map((diagnostic, index) => (
              <tr key={index}>
                <td className="diagnostic-problem">{diagnostic.problem}</td>
                <td className="diagnostic-description">{diagnostic.description}</td>
                <td>
                  <span className={`diagnostic-status status-${diagnostic.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {diagnostic.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DiagnosticList

