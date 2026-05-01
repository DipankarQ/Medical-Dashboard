# Medical Dashboard

A modern React-based medical dashboard application for displaying and monitoring patient health information. The dashboard provides a comprehensive view of patient demographics, vital signs, diagnosis history, diagnostic test results, and lab work.


<img width="1364" height="605" alt="Screenshot 2026-04-24 130516" src="https://github.com/user-attachments/assets/11beef1e-0a6d-4a07-8f1d-8c948b343aee" />

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Linting](#linting)
- [Development Workflow](#development-workflow)
- [Known Limitations](#known-limitations)
- [License](#license)
- [Support](#support)

## Features

- **Patient Management** — Browse and select from a list of patients with quick filtering
- **Vital Signs Monitoring** — Real-time display of heart rate, temperature, and respiratory rate with status indicators
- **Blood Pressure Tracking** — Visual charts showing blood pressure trends over time
- **Diagnosis History** — Complete history of patient diagnoses with visual trend analysis
- **Diagnostic Results** — View diagnostic tests and their outcomes
- **Lab Results** — Access to laboratory test results and findings
- **Responsive Design** — Works seamlessly across desktop and tablet devices
- **Basic Authentication** — Secure API communication with standard HTTP Basic Auth

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **HTTP Client**: Axios 1.13.1 with Basic Authentication
- **Charting**: Chart.js 4.5.1 + React-ChartJS-2 5.3.1
- **Linting**: ESLint 9.36.0 with React plugins
- **Development Environment**: Node.js 16+ recommended




### 3. Configure API Endpoint

**⚠️ Important:** Before running the application, you must configure the API endpoint.

Open `src/utils/api.js` and update the `API_BASE_URL` constant with your Coalition Technologies Patient Data API endpoint:

```javascript
// Replace this placeholder:
const API_BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev'

// With your actual API endpoint:
const API_BASE_URL = 'https://your-actual-api-endpoint.coalitiontechnologies.workers.dev'
```

The API requires Basic Authentication with the following credentials (also in `src/utils/api.js`):

- **Username**: `coalition`
- **Password**: `skills-test`

## Running the Application

### Development Mode

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173/`.

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── PatientSidebar.jsx      # Patient list and selection
│   │   ├── DiagnosisHistory.jsx    # Blood pressure trends chart
│   │   ├── VitalSigns.jsx          # Heart rate, temp, respiratory rate
│   │   ├── DiagnosticList.jsx      # Diagnostic test results
│   │   ├── PatientDetails.jsx      # Patient demographics
│   │   └── LabResults.jsx          # Laboratory test results
│   ├── utils/
│   │   └── api.js                  # Axios client and API functions
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Application styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Application entry point
├── index.html               # HTML template
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies and scripts
└── README.md              # This file
```

## API Integration

### Overview

The Medical Dashboard is designed to work with the **Coalition Technologies Patient Data API**, which provides comprehensive patient health information including demographics, vital signs, diagnosis history, and lab results.

### API Endpoint

The application communicates with the API's main endpoint to fetch all patient data:

- **Base URL**: `https://your-actual-api-endpoint.coalitiontechnologies.workers.dev`
- **Authentication**: HTTP Basic Auth (username: `coalition`, password: `skills-test`)
- **Default Endpoint**: `/` (returns all patient records)

### API Response Format

The API returns patient records in the following structure:

```javascript
{
  "name": "Jessica Taylor",
  "age": 28,
  "gender": "Female",
  "date_of_birth": "August 11, 1996",
  "phone_number": "(045) 555-1034",
  "emergency_contact": "(032) 888-9878",
  "insurance_type": "Sunrise Health Assurance",
  "profile_picture": "...",
  "diagnosis_history": [
    {
      "month": "October",
      "year": "2023",
      "blood_pressure": {
        "systolic": { "value": 125, "levels": "Normal" },
        "diastolic": { "value": 80, "levels": "Normal" }
      },
      "heart_rate": { "value": 78, "levels": "Normal" },
      "respiratory_rate": { "value": 16, "levels": "Normal" },
      "temperature": { "value": 98.6, "levels": "Normal" }
    }
  ],
  "diagnostic_list": [...],
  "lab_results": [...]
}
```

### Data Management

The application automatically:

1. Fetches all patient records on startup
2. Transforms API data into a format suitable for the UI components
3. Extracts vital signs from the latest diagnosis history entry
4. Generates blood pressure trend charts from historical data

## Troubleshooting

### Issue: "API endpoint not configured" banner shows

**Problem**: The app displays a yellow warning banner saying "API endpoint not configured. Using mock data for demonstration."

**Solution**:

1. Ensure you've updated the `API_BASE_URL` in `src/utils/api.js` with the correct Coalition Technologies API endpoint
2. Verify the endpoint URL is correct and accessible
3. Confirm your network can reach the API endpoint (check firewall/proxy settings)
4. Restart the development server after updating the endpoint

### Issue: 401 Unauthorized Errors

**Problem**: API requests fail with 401 status codes.

**Solution**:

1. Verify the Basic Auth credentials in `src/utils/api.js` are correct:
  - Username: `coalition`
  - Password: `skills-test`
2. Ensure no spaces or typos in the credentials
3. Confirm the API requires these exact credentials

### Issue: CORS errors in browser console

**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:

1. Verify the API is configured to allow CORS requests from your development domain
2. Check network tab in browser DevTools for the actual request URL
3. Contact API provider if CORS headers are not properly configured

### Issue: No patient data loads

**Problem**: Patient list is empty or patient details don't display.

**Solution**:

1. Check browser console for error messages
2. Verify API endpoint is responding with data (use a tool like Postman or curl)
3. Check network tab in DevTools to inspect API responses
4. Ensure the API response structure matches the expected format
5. Verify Basic Auth credentials are being sent with requests

### Issue: Charts not displaying

**Problem**: Vital signs or blood pressure charts appear blank.

**Solution**:

1. Ensure patient data includes diagnosis history with vital signs
2. Check browser console for Chart.js errors
3. Verify chart data is being properly extracted from API response
4. Try selecting a different patient to confirm chart functionality

## Linting

Check code quality and style compliance:

```bash
npm run lint
```

Fix automatic linting issues:

```bash
npx eslint . --fix
```

## Development Workflow

### Adding a New Component

1. Create a new file in `src/components/YourComponent.jsx`
2. Import and use it in `App.jsx`
3. Add required styling if needed
4. Test with real API data or mock data

### Updating API Calls

All API interactions are centralized in `src/utils/api.js`. To modify API calls:

1. Edit the relevant function in `api.js`
2. Update the `transformPatientData()` function if response structure changes
3. Test with the actual API endpoint

### Styling

- Global styles: `src/index.css`
- Component-specific styles: `src/App.css` (can be split into component-specific files as needed)

## Known Limitations

- The application currently falls back to mock data if the API endpoint is not configured
- Patient filtering is done client-side on the data returned from the API
- The API response limit depends on the provider's configuration

## Support

For issues or questions, open a ticket in your project issue tracker or contact the project maintainer.

---

**Last Updated**: April 2026
