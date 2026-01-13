/**
 * Upload Routes
 */

const uploadController = require('../controllers/upload.controller');
const upload = require('../middleware/upload.middleware');

module.exports = (app) => {
  // Upload single file
  app.post('/api/upload', upload.single('file'), uploadController.uploadFile);

  // Upload multiple files
  app.post('/api/upload/multiple', upload.array('files', 10), uploadController.uploadMultipleFiles);

  // List files
  app.get('/api/files', uploadController.listFiles);

  // Delete file
  app.delete('/api/files/:fileId', uploadController.deleteFile);

  // Get upload history for current user
  app.get('/api/upload/history', uploadController.getUploadHistory);
};
