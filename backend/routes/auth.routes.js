/**
 * Auth Routes
 * (Used only once to get refresh token)
 */

const authController = require('../controllers/auth.controller');

module.exports = (app) => {
  // Get Google OAuth URL
  app.get('/api/auth/google', authController.getAuthUrl);

  // OAuth callback
  app.get('/api/auth/google/callback', authController.handleCallback);
};
