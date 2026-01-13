/**
 * Upload Controller
 * Handles file upload operations
 */

const googleDriveService = require('../services/googleDrive.service');
const dbService = require('../services/db.service');
const { verifyToken } = require('../utils/jwt');

/**
 * Fix Thai filename encoding issue
 * Multer reads filename as Latin-1, need to convert to UTF-8
 */
const fixThaiFilename = (filename) => {
  try {
    // Convert from Latin-1 to UTF-8
    return Buffer.from(filename, 'latin1').toString('utf8');
  } catch (error) {
    // If conversion fails, return original filename
    return filename;
  }
};

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
      const fileName = fixThaiFilename(file.originalname);

      console.log('Uploading file:', {
        name: fileName,
        size: file.size,
        type: file.mimetype
      });

      // Upload to Google Drive
      const driveFile = await googleDriveService.uploadFile(
        file.buffer,
        fileName,
        file.mimetype
      );

      // Get user id from token
      let userId = null;
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const payload = verifyToken(token);
        if (payload) {
          userId = payload.userId;
        }
      }

      // Save upload log to database
      if (userId) {
        try {
          await dbService.createUploadLog({
            userId,
            fileName: driveFile.name,
            originalName: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype,
            driveFileId: driveFile.id,
            driveUrl: driveFile.webViewLink,
            status: 'success'
          });
        } catch (logError) {
          console.error('[UPLOAD] Error saving log:', logError.message);
        }
      }

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
      
      // Provide more specific error messages
      let errorMessage = 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์';
      let statusCode = 500;
      
      // Handle refresh token expiration
      if (error.code === 'INVALID_REFRESH_TOKEN') {
        errorMessage = 'Google Refresh Token หมดอายุหรือถูกยกเลิก กรุณาไปที่ /api/auth/google เพื่อขอ Refresh Token ใหม่';
        statusCode = 401; // Unauthorized
      }
      // Handle network errors
      else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับ Google Drive ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต DNS หรือ Firewall';
        statusCode = 503; // Service Unavailable
      }
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: error.message,
        code: error.code
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
          fixThaiFilename(file.originalname),
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
      
      // Provide more specific error messages
      let errorMessage = 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์';
      let statusCode = 500;
      
      // Handle refresh token expiration
      if (error.code === 'INVALID_REFRESH_TOKEN') {
        errorMessage = 'Google Refresh Token หมดอายุหรือถูกยกเลิก กรุณาไปที่ /api/auth/google เพื่อขอ Refresh Token ใหม่';
        statusCode = 401; // Unauthorized
      }
      // Handle network errors
      else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับ Google Drive ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต DNS หรือ Firewall';
        statusCode = 503; // Service Unavailable
      }
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: error.message,
        code: error.code
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
      
      // Provide more specific error messages
      let errorMessage = 'เกิดข้อผิดพลาดในการดึงรายการไฟล์';
      let statusCode = 500;
      
      // Handle refresh token expiration
      if (error.code === 'INVALID_REFRESH_TOKEN') {
        errorMessage = 'Google Refresh Token หมดอายุหรือถูกยกเลิก กรุณาไปที่ /api/auth/google เพื่อขอ Refresh Token ใหม่';
        statusCode = 401; // Unauthorized
      }
      // Handle network errors
      else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับ Google Drive ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต DNS หรือ Firewall';
        statusCode = 503; // Service Unavailable
      }
      
      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: error.message,
        code: error.code
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

      // Provide more specific error messages
      let errorMessage = 'เกิดข้อผิดพลาดในการลบไฟล์';
      let statusCode = 500;

      // Handle refresh token expiration
      if (error.code === 'INVALID_REFRESH_TOKEN') {
        errorMessage = 'Google Refresh Token หมดอายุหรือถูกยกเลิก กรุณาไปที่ /api/auth/google เพื่อขอ Refresh Token ใหม่';
        statusCode = 401; // Unauthorized
      }
      // Handle network errors
      else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        errorMessage = 'ไม่สามารถเชื่อมต่อกับ Google Drive ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต DNS หรือ Firewall';
        statusCode = 503; // Service Unavailable
      }

      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: error.message,
        code: error.code
      });
    }
  },

  /**
   * Get upload history for current user
   * GET /api/upload/history
   */
  getUploadHistory: async (req, res) => {
    try {
      // Get user id from token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'กรุณาเข้าสู่ระบบ'
        });
      }

      const token = authHeader.substring(7);
      const payload = verifyToken(token);
      if (!payload || !payload.userId) {
        return res.status(401).json({
          success: false,
          message: 'Token ไม่ถูกต้องหรือหมดอายุ'
        });
      }

      const logs = await dbService.getUploadLogsByUserId(payload.userId);

      res.json({
        success: true,
        logs: logs
      });

    } catch (error) {
      console.error('Get upload history error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการดึงประวัติอัพโหลด',
        error: error.message
      });
    }
  }
};

module.exports = uploadController;
