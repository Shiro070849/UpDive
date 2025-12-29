/**
 * Auth Routes
 * Handles user authentication and Google OAuth
 */

const authController = require('../controllers/auth.controller');

module.exports = (app) => {
  // User Authentication
  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/logout', authController.logout);
  app.get('/api/auth/verify', authController.verifyUserToken);

  // Google OAuth (for admin to get refresh token)
  app.get('/api/auth/google', authController.getAuthUrl);
  app.get('/api/auth/google/callback', authController.handleCallback);
};
