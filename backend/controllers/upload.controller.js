/**
 * Upload Controller
 * Handles file upload operations
 */

const googleDriveService = require('../services/googleDrive.service');

const uploadController = {
  /**
   * Upload single file to Google Drive
   * POST /api/upload
   */
  uploadFile: async (req, res) => {
    try {
      // Check if file exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'ไม่พบไฟล์ที่ต้องการอัปโหลด'
        });
      }

      const file = req.file;

      console.log('Uploading file:', {
        name: file.originalname,
        size: file.size,
        type: file.mimetype
      });

      // Upload to Google Drive
      const driveFile = await googleDriveService.uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype
      );

      // Return success response
      res.json({
        success: true,
        message: 'อัปโหลดไฟล์สำเร็จ',
        file: {
          id: driveFile.id,
          name: driveFile.name,
          mimeType: driveFile.mimeType,
          size: driveFile.size,
          webViewLink: driveFile.webViewLink,
          createdTime: driveFile.createdTime
        }
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์',
        error: error.message
      });
    }
  },

  /**
   * Upload multiple files to Google Drive
   * POST /api/upload/multiple
   */
  uploadMultipleFiles: async (req, res) => {
    try {
      // Check if files exist
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'ไม่พบไฟล์ที่ต้องการอัปโหลด'
        });
      }

      console.log(`Uploading ${req.files.length} files...`);

      // Upload all files
      const uploadPromises = req.files.map(file =>
        googleDriveService.uploadFile(
          file.buffer,
          file.originalname,
          file.mimetype
        )
      );

      const driveFiles = await Promise.all(uploadPromises);

      // Return success response
      res.json({
        success: true,
        message: `อัปโหลด ${driveFiles.length} ไฟล์สำเร็จ`,
        files: driveFiles.map(file => ({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          webViewLink: file.webViewLink,
          createdTime: file.createdTime
        }))
      });

    } catch (error) {
      console.error('Multiple upload error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์',
        error: error.message
      });
    }
  },

  /**
   * List files from Google Drive
   * GET /api/files
   */
  listFiles: async (req, res) => {
    try {
      const files = await googleDriveService.listFiles(20);

      res.json({
        success: true,
        files: files
      });

    } catch (error) {
      console.error('List files error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงรายการไฟล์',
        error: error.message
      });
    }
  },

  /**
   * Delete file from Google Drive
   * DELETE /api/files/:fileId
   */
  deleteFile: async (req, res) => {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        return res.status(400).json({
          success: false,
          message: 'ไม่พบ ID ของไฟล์'
        });
      }

      await googleDriveService.deleteFile(fileId);

      res.json({
        success: true,
        message: 'ลบไฟล์สำเร็จ'
      });

    } catch (error) {
      console.error('Delete file error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการลบไฟล์',
        error: error.message
      });
    }
  }
};

module.exports = uploadController;
