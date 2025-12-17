/**
 * Upload Service
 * API calls for file upload
 */

import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3001';

const uploadService = {
  /**
   * Upload single file
   */
  async uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
        'Content-Type': 'multipart/form-data'
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
    const response = await axios.get(`${API_URL}/api/files`);
    return response.data;
  },

  /**
   * Delete file
   */
  async deleteFile(fileId) {
    const response = await axios.delete(`${API_URL}/api/files/${fileId}`);
    return response.data;
  }
};

export default uploadService;
