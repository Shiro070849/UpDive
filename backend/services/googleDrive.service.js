/**
 * Google Drive Service
 * Handles all Google Drive operations
 */

const { google } = require('googleapis');
const googleConfig = require('../config/google.config');
const stream = require('stream');

class GoogleDriveService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      googleConfig.oauth.clientId,
      googleConfig.oauth.clientSecret,
      googleConfig.oauth.redirectUri
    );
  }

  /**
   * Generate OAuth URL for first-time authorization
   * (Used only once to get refresh token)
   */
  getAuthUrl() {
    const authUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: googleConfig.scopes,
      prompt: 'consent'
    });
    return authUrl;
  }

  /**
   * Exchange authorization code for tokens
   * (Used only once to get refresh token)
   */
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Error getting tokens:', error);
      throw error;
    }
  }

  /**
   * Set credentials using refresh token from .env
   * Google OAuth2 client will automatically refresh access token when it expires
   */
  setCredentials() {
    if (!googleConfig.drive.refreshToken) {
      throw new Error('GOOGLE_REFRESH_TOKEN is not configured in .env file');
    }

    this.oauth2Client.setCredentials({
      refresh_token: googleConfig.drive.refreshToken
    });

    // Listen for token refresh events (for logging)
    this.oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // New refresh token received (rare, but can happen)
        console.log('⚠️ New refresh token received - consider updating .env file');
      }
      if (tokens.access_token) {
        console.log('✅ Access token refreshed successfully');
      }
    });
  }

  /**
   * Check if refresh token is valid by attempting to get a new access token
   * Returns true if valid, false if expired/invalid
   */
  async validateRefreshToken() {
    try {
      this.setCredentials();
      
      // Try to refresh access token
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      
      if (credentials.access_token) {
        console.log('✅ Refresh token is valid');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Refresh token validation failed:', error.message);
      
      // Check for specific error codes
      if (error.message && error.message.includes('invalid_grant')) {
        console.error('⚠️ Refresh token has expired or been revoked');
        console.error('💡 Solution: Get a new refresh token from /api/auth/google');
      }
      
      return false;
    }
  }

  /**
   * Upload file to Google Drive
   */
  async uploadFile(fileBuffer, fileName, mimeType) {
    try {
      // Set credentials
      this.setCredentials();

      // Create Drive API client
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      // Convert buffer to stream
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);

      // File metadata
      const fileMetadata = {
        name: fileName,
        parents: [googleConfig.drive.folderId] // Upload to specific folder
      };

      // Upload file
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: mimeType,
          body: bufferStream
        },
        fields: 'id, name, mimeType, size, webViewLink, createdTime'
      });

      console.log('File uploaded successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading file to Drive:', error);
      
      // Handle refresh token expiration
      if (error.message && (error.message.includes('invalid_grant') || error.message.includes('Token has been expired'))) {
        const tokenError = new Error(
          'Google refresh token has expired or been revoked. ' +
          'Please visit /api/auth/google to get a new refresh token and update your .env file.'
        );
        tokenError.code = 'INVALID_REFRESH_TOKEN';
        tokenError.originalError = error;
        throw tokenError;
      }
      
      // Provide more helpful error messages for common network issues
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        const networkError = new Error(
          'Network connectivity issue: Cannot reach Google APIs. ' +
          'Please check your internet connection, DNS settings, firewall, or proxy configuration. ' +
          `Error: ${error.message}`
        );
        networkError.code = error.code;
        networkError.originalError = error;
        throw networkError;
      }
      
      throw error;
    }
  }

  /**
   * List files in Google Drive folder
   */
  async listFiles(pageSize = 10) {
    try {
      this.setCredentials();
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      const response = await drive.files.list({
        q: `'${googleConfig.drive.folderId}' in parents and trashed=false`,
        pageSize: pageSize,
        fields: 'files(id, name, mimeType, size, webViewLink, createdTime)',
        orderBy: 'createdTime desc'
      });

      return response.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
      
      // Handle refresh token expiration
      if (error.message && (error.message.includes('invalid_grant') || error.message.includes('Token has been expired'))) {
        const tokenError = new Error(
          'Google refresh token has expired or been revoked. ' +
          'Please visit /api/auth/google to get a new refresh token and update your .env file.'
        );
        tokenError.code = 'INVALID_REFRESH_TOKEN';
        tokenError.originalError = error;
        throw tokenError;
      }
      
      // Provide more helpful error messages for common network issues
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        const networkError = new Error(
          'Network connectivity issue: Cannot reach Google APIs. ' +
          'Please check your internet connection, DNS settings, firewall, or proxy configuration. ' +
          `Error: ${error.message}`
        );
        networkError.code = error.code;
        networkError.originalError = error;
        throw networkError;
      }
      
      throw error;
    }
  }

  /**
   * Delete file from Google Drive
   */
  async deleteFile(fileId) {
    try {
      this.setCredentials();
      const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

      await drive.files.delete({
        fileId: fileId
      });

      console.log('File deleted successfully:', fileId);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      
      // Handle refresh token expiration
      if (error.message && (error.message.includes('invalid_grant') || error.message.includes('Token has been expired'))) {
        const tokenError = new Error(
          'Google refresh token has expired or been revoked. ' +
          'Please visit /api/auth/google to get a new refresh token and update your .env file.'
        );
        tokenError.code = 'INVALID_REFRESH_TOKEN';
        tokenError.originalError = error;
        throw tokenError;
      }
      
      // Provide more helpful error messages for common network issues
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        const networkError = new Error(
          'Network connectivity issue: Cannot reach Google APIs. ' +
          'Please check your internet connection, DNS settings, firewall, or proxy configuration. ' +
          `Error: ${error.message}`
        );
        networkError.code = error.code;
        networkError.originalError = error;
        throw networkError;
      }
      
      throw error;
    }
  }
}

module.exports = new GoogleDriveService();
