/**
 * Diagnostics Controller
 * Provides network and system diagnostics
 */

const networkDiagnostics = require('../utils/networkDiagnostics');

const diagnosticsController = {
  /**
   * Run network diagnostics
   * GET /api/diagnostics/network
   */
  networkDiagnostics: async (req, res) => {
    try {
      const results = await networkDiagnostics.runNetworkDiagnostics();
      
      res.json({
        success: true,
        diagnostics: results
      });
    } catch (error) {
      console.error('Diagnostics error:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการตรวจสอบระบบ',
        error: error.message
      });
    }
  }
};

module.exports = diagnosticsController;


