/**
 * Upload Service
 * API calls for file upload
 */

import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

/**
 * Get authorization header with token
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const uploadService = {
  /**
   * Upload single file
   */
  async uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader()
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    });

    return response.data;
  },

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(files, onProgress) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await axios.post(`${API_URL}/api/upload/multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader()
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      }
    });

    return response.data;
  },

  /**
   * Get list of uploaded files
   */
  async getFiles() {
    const response = await axios.get(`${API_URL}/api/files`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  /**
   * Delete file
   */
  async deleteFile(fileId) {
    const response = await axios.delete(`${API_URL}/api/files/${fileId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  /**
   * Get upload history for current user
   */
  async getUploadHistory() {
    const response = await axios.get(`${API_URL}/api/upload/history`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

export default uploadService;
