import React, { useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function DiagnosisHistory({ patient }) {
  const chartRef = useRef(null)

  if (!patient || !patient.bloodPressure) {
    return (
      <div className="diagnosis-history-card">
        <div className="card-header">
          <h3>Diagnosis History</h3>
        </div>
        <div className="card-content">
          <p>No patient selected</p>
        </div>
      </div>
    )
  }

  const currentReading = patient.bloodPressure[patient.bloodPressure.length - 1]
  const avgSystolic = patient.bloodPressure.reduce((sum, reading) => sum + reading.systolic, 0) / patient.bloodPressure.length
  const avgDiastolic = patient.bloodPressure.reduce((sum, reading) => sum + reading.diastolic, 0) / patient.bloodPressure.length

  const systolicStatus = currentReading.systolic > avgSystolic ? 'Higher Than Average' : 
                         currentReading.systolic < avgSystolic ? 'Lower Than Average' : 'Normal'
  const diastolicStatus = currentReading.diastolic > avgDiastolic ? 'Higher Than Average' : 
                          currentReading.diastolic < avgDiastolic ? 'Lower Than Average' : 'Normal'

  const chartData = {
    labels: patient.bloodPressure.map(reading => reading.date),
    datasets: [
      {
        label: 'Systolic',
        data: patient.bloodPressure.map(reading => reading.systolic),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Diastolic',
        data: patient.bloodPressure.map(reading => reading.diastolic),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Blood Pressure',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
        },
        title: {
          display: false,
        },
      },
      x: {
        title: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="diagnosis-history-card">
      <div className="card-header">
        <h3>Diagnosis History</h3>
        <select className="time-period-select" defaultValue="6months">
          <option value="6months">Last 6 months</option>
          <option value="1year">Last year</option>
          <option value="2years">Last 2 years</option>
        </select>
      </div>
      
      <div className="chart-container">
        <div className="chart-wrapper">
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
        
        <div className="current-readings">
          <div className="reading-item">
            <div className="reading-label">Systolic</div>
            <div className="reading-value">{currentReading.systolic}</div>
            <div className={`reading-status ${systolicStatus.toLowerCase().replace(/\s+/g, '-')}`}>
              {systolicStatus}
            </div>
          </div>
          <div className="reading-item">
            <div className="reading-label">Diastolic</div>
            <div className="reading-value">{currentReading.diastolic}</div>
            <div className={`reading-status ${diastolicStatus.toLowerCase().replace(/\s+/g, '-')}`}>
              {diastolicStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiagnosisHistory

