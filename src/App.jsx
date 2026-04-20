import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import PatientSidebar from './components/PatientSidebar'
import DiagnosisHistory from './components/DiagnosisHistory'
import VitalSigns from './components/VitalSigns'
import DiagnosticList from './components/DiagnosticList'
import PatientDetails from './components/PatientDetails'
import LabResults from './components/LabResults'
import { fetchPatients, transformPatientData } from './utils/api'

function App() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    fetchPatientData()
  }, [])

  const fetchPatientData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Try to fetch from API
      const apiPatients = await fetchPatients()
      
      if (apiPatients && apiPatients.length > 0) {
        // Transform API data to match our component structure
        const transformedPatients = apiPatients.map(transformPatientData)
        setPatients(transformedPatients)
        setSelectedPatient(transformedPatients[0])
        setUsingMockData(false)
      } else {
        throw new Error('No patients returned from API')
      }
    } catch (err) {
      console.error('Error fetching patient data:', err)
      setError(err.message)
      
      // Fallback to mock data for development/demonstration
      const mockData = getMockPatientData()
      setPatients(mockData)
      setSelectedPatient(mockData[0])
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
  }

  if (loading && !selectedPatient) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading patient data...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <PatientSidebar 
          patients={patients}
          selectedPatient={selectedPatient}
          onPatientSelect={handlePatientSelect}
        />
        <main className="main-content">
          <div className="main-content-top">
            <DiagnosisHistory patient={selectedPatient} />
            <VitalSigns patient={selectedPatient} />
          </div>
          <div className="main-content-bottom">
            <div className="left-section">
              <DiagnosticList patient={selectedPatient} />
            </div>
            <div className="right-section">
              <PatientDetails patient={selectedPatient} />
              <LabResults patient={selectedPatient} />
            </div>
          </div>
        </main>
      </div>
      {usingMockData && (
        <div className="error-banner">
          ⚠️ API endpoint not configured. Using mock data for demonstration. 
          Please update the API_BASE_URL in src/utils/api.js with the correct endpoint from the Coalition Technologies Patient Data API documentation.
        </div>
      )}
    </div>
  )
}

// Mock data for development/testing
function getMockPatientData() {
  return [
    {
      id: 1,
      name: 'Jessica Taylor',
      age: 28,
      gender: 'Female',
      dob: 'August 11, 1996',
      contact: '(045) 555-1034',
      emergencyContact: '(032) 888-9878',
      insuranceProvider: 'Sunrise Health Assurance',
      profileImage: 'https://i.pravatar.cc/150?img=12',
      bloodPressure: [
        { date: 'Oct 2023', systolic: 125, diastolic: 80 },
        { date: 'Nov 2023', systolic: 130, diastolic: 82 },
        { date: 'Dec 2023', systolic: 135, diastolic: 85 },
        { date: 'Jan 2024', systolic: 140, diastolic: 88 },
        { date: 'Feb 2024', systolic: 145, diastolic: 90 },
        { date: 'Mar 2024', systolic: 160, diastolic: 78 }
      ],
      vitalSigns: {
        respiratoryRate: { value: 20, unit: 'bpm', status: 'Normal' },
        temperature: { value: 98.6, unit: '°F', status: 'Normal' },
        heartRate: { value: 78, unit: 'bpm', status: 'Lower Than Average' }
      },
      diagnostics: [
        { problem: 'Hypertension', description: 'Chronic high blood pressure', status: 'Under Observation' },
        { problem: 'Type 2 Diabetes', description: 'Insulin resistance and elevated blood sugar', status: 'Cured' },
        { problem: 'Asthma', description: 'Recurrent episodes of bronchial constriction', status: 'Inactive' }
      ],
      labResults: [
        'Blood Tests',
        'CT Scans',
        'Radiology Reports',
        'X-Rays',
        'Urine Test'
      ]
    },
    {
      id: 2,
      name: 'Emily Williams',
      age: 32,
      gender: 'Female',
      dob: 'March 15, 1992',
      contact: '(045) 555-1234',
      emergencyContact: '(032) 888-1234',
      insuranceProvider: 'Blue Cross Health',
      profileImage: 'https://i.pravatar.cc/150?img=47',
      bloodPressure: [
        { date: 'Oct 2023', systolic: 120, diastolic: 75 },
        { date: 'Nov 2023', systolic: 118, diastolic: 73 },
        { date: 'Dec 2023', systolic: 122, diastolic: 77 },
        { date: 'Jan 2024', systolic: 125, diastolic: 80 },
        { date: 'Feb 2024', systolic: 128, diastolic: 82 },
        { date: 'Mar 2024', systolic: 130, diastolic: 85 }
      ],
      vitalSigns: {
        respiratoryRate: { value: 18, unit: 'bpm', status: 'Normal' },
        temperature: { value: 98.4, unit: '°F', status: 'Normal' },
        heartRate: { value: 72, unit: 'bpm', status: 'Normal' }
      },
      diagnostics: [
        { problem: 'Mild Hypertension', description: 'Slightly elevated blood pressure', status: 'Under Observation' }
      ],
      labResults: [
        'Blood Tests',
        'Complete Metabolic Panel'
      ]
    },
    {
      id: 3,
      name: 'Ryan Johnson',
      age: 45,
      gender: 'Male',
      dob: 'June 20, 1979',
      contact: '(045) 555-5678',
      emergencyContact: '(032) 888-5678',
      insuranceProvider: 'Medicare Plus',
      profileImage: 'https://i.pravatar.cc/150?img=33',
      bloodPressure: [
        { date: 'Oct 2023', systolic: 140, diastolic: 90 },
        { date: 'Nov 2023', systolic: 142, diastolic: 92 },
        { date: 'Dec 2023', systolic: 145, diastolic: 95 },
        { date: 'Jan 2024', systolic: 148, diastolic: 96 },
        { date: 'Feb 2024', systolic: 150, diastolic: 98 },
        { date: 'Mar 2024', systolic: 152, diastolic: 100 }
      ],
      vitalSigns: {
        respiratoryRate: { value: 16, unit: 'bpm', status: 'Normal' },
        temperature: { value: 98.8, unit: '°F', status: 'Normal' },
        heartRate: { value: 82, unit: 'bpm', status: 'Normal' }
      },
      diagnostics: [
        { problem: 'Type 2 Diabetes', description: 'Insulin resistance and elevated blood sugar', status: 'Under Observation' },
        { problem: 'Hypertension', description: 'Chronic high blood pressure', status: 'Under Observation' }
      ],
      labResults: [
        'Blood Tests',
        'CT Scans',
        'X-Rays',
        'EKG'
      ]
    }
  ]
}

export default App

