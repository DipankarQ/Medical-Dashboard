import axios from 'axios'

// API Base URL - configured with the actual endpoint
const API_BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev'

// API Credentials (Basic Authentication)
const USERNAME = 'coalition'
const PASSWORD = 'skills-test'

// Create Axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: USERNAME,
    password: PASSWORD
  },
  timeout: 10000, // 10 second timeout
})

/**
 * Fetches all patients from the API
 * @returns {Promise<Array>} Array of patient objects
 */
export const fetchPatients = async () => {
  try {
    const response = await apiClient.get('')
    const data = response.data
    
    // The API returns an array of patients directly
    if (Array.isArray(data)) {
      return data
    } else if (data.patients) {
      return data.patients
    } else if (data.data) {
      return data.data
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`)
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server')
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error
    }
  }
}

/**
 * Fetches a specific patient by ID
 * @param {string} patientId - The patient's unique identifier
 * @returns {Promise<Object>} Patient object
 */
export const fetchPatientById = async (patientId) => {
  try {
    // First fetch all patients, then filter by ID
    // (since the API returns all patients at once)
    const patients = await fetchPatients()
    const patient = patients.find(p => p.name === patientId || p.id === patientId)
    
    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found`)
    }
    
    return patient
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * Transforms API response to match our component structure
 * This function adapts the API response format to our UI requirements
 * @param {Object} apiPatient - Patient data from API
 * @returns {Object} Transformed patient object
 */
export const transformPatientData = (apiPatient) => {
  return {
    id: apiPatient.name, // Using name as ID since API doesn't provide unique ID
    name: apiPatient.name,
    age: apiPatient.age,
    gender: apiPatient.gender,
    dob: apiPatient.date_of_birth,
    contact: apiPatient.phone_number,
    emergencyContact: apiPatient.emergency_contact,
    insuranceProvider: apiPatient.insurance_type,
    profileImage: apiPatient.profile_picture,
    bloodPressure: transformBloodPressureData(apiPatient.diagnosis_history),
    vitalSigns: {
      respiratoryRate: {
        value: getLatestVitalValue(apiPatient.diagnosis_history, 'respiratory_rate'),
        unit: 'bpm',
        status: getLatestVitalStatus(apiPatient.diagnosis_history, 'respiratory_rate')
      },
      temperature: {
        value: getLatestVitalValue(apiPatient.diagnosis_history, 'temperature'),
        unit: '°F',
        status: getLatestVitalStatus(apiPatient.diagnosis_history, 'temperature')
      },
      heartRate: {
        value: getLatestVitalValue(apiPatient.diagnosis_history, 'heart_rate'),
        unit: 'bpm',
        status: getLatestVitalStatus(apiPatient.diagnosis_history, 'heart_rate')
      }
    },
    diagnostics: apiPatient.diagnostic_list || [],
    labResults: apiPatient.lab_results || []
  }
}

/**
 * Gets the latest vital value from diagnosis history
 */
function getLatestVitalValue(diagnosisHistory, vitalType) {
  if (!diagnosisHistory || diagnosisHistory.length === 0) return 0
  
  // Get the most recent entry (first in array)
  const latest = diagnosisHistory[0]
  
  if (vitalType === 'respiratory_rate') {
    return latest.respiratory_rate?.value || 0
  } else if (vitalType === 'temperature') {
    return latest.temperature?.value || 0
  } else if (vitalType === 'heart_rate') {
    return latest.heart_rate?.value || 0
  }
  
  return 0
}

/**
 * Gets the latest vital status from diagnosis history
 */
function getLatestVitalStatus(diagnosisHistory, vitalType) {
  if (!diagnosisHistory || diagnosisHistory.length === 0) return 'Normal'
  
  // Get the most recent entry (first in array)
  const latest = diagnosisHistory[0]
  
  if (vitalType === 'respiratory_rate') {
    return latest.respiratory_rate?.levels || 'Normal'
  } else if (vitalType === 'temperature') {
    return latest.temperature?.levels || 'Normal'
  } else if (vitalType === 'heart_rate') {
    return latest.heart_rate?.levels || 'Normal'
  }
  
  return 'Normal'
}

/**
 * Transforms blood pressure data from API format
 */
function transformBloodPressureData(diagnosisHistory) {
  if (!diagnosisHistory || !Array.isArray(diagnosisHistory)) return []
  
  return diagnosisHistory.map(record => ({
    date: formatDate(record.month, record.year),
    systolic: record.blood_pressure?.systolic?.value || 0,
    diastolic: record.blood_pressure?.diastolic?.value || 0,
    status: record.blood_pressure?.systolic?.levels || 'Normal'
  }))
}

/**
 * Formats date to readable string
 */
function formatDate(month, year) {
  if (!month || !year) return ''
  return `${month}, ${year}`
}
