/**
 * API Service
 * This is a sample API service - replace with your actual API calls
 */

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8081'

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Example API methods
export default {
  // Example: GET request
  getHello() {
    return apiClient.get('/api/example/hello')
  },

  // Add your API methods here
  // get(endpoint) {
  //   return apiClient.get(endpoint)
  // },
  // post(endpoint, data) {
  //   return apiClient.post(endpoint, data)
  // }
}
