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
   */
  setCredentials() {
    this.oauth2Client.setCredentials({
      refresh_token: googleConfig.drive.refreshToken
    });
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
      throw error;
    }
  }
}

module.exports = new GoogleDriveService();
