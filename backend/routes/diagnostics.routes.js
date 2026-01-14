/**
 * Diagnostics Routes
 */

const diagnosticsController = require('../controllers/diagnostics.controller');

module.exports = (app) => {
  // Network diagnostics endpoint
  app.get('/api/diagnostics/network', diagnosticsController.networkDiagnostics);
};





