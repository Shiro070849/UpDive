/**
 * Auth Controller
 * Handles Google OAuth authorization (for getting refresh token only)
 */

const googleDriveService = require('../services/googleDrive.service');

const authController = {
  /**
   * Get Google OAuth URL
   * GET /api/auth/google
   */
  getAuthUrl: (req, res) => {
    try {
      const authUrl = googleDriveService.getAuthUrl();

      res.json({
        success: true,
        authUrl: authUrl
      });
    } catch (error) {
      console.error('Error generating auth URL:', error);
      res.status(500).json({
        success: false,
        message: 'เกิดข้อผิดพลาดในการสร้าง URL',
        error: error.message
      });
    }
  },

  /**
   * Handle OAuth callback and get tokens
   * GET /api/auth/google/callback?code=xxx
   */
  handleCallback: async (req, res) => {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).send('No authorization code provided');
      }

      // Exchange code for tokens
      const tokens = await googleDriveService.getTokensFromCode(code);

      // Show tokens to user (for copying to .env)
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #4CAF50; }
            .token-box {
              background: #f9f9f9;
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 4px;
              margin: 10px 0;
              font-family: monospace;
              word-break: break-all;
            }
            .copy-btn {
              background: #4CAF50;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 10px;
            }
            .copy-btn:hover {
              background: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✅ Authorization Successful!</h1>
            <p>คัดลอก <strong>refresh_token</strong> ไปใส่ในไฟล์ <code>.env</code></p>

            <h3>GOOGLE_REFRESH_TOKEN:</h3>
            <div class="token-box" id="refreshToken">${tokens.refresh_token}</div>
            <button class="copy-btn" onclick="copyToken()">📋 Copy Refresh Token</button>

            <h3>Full Tokens (สำหรับดูข้อมูล):</h3>
            <div class="token-box">${JSON.stringify(tokens, null, 2)}</div>

            <hr>
            <h3>Next Steps:</h3>
            <ol>
              <li>คัดลอก refresh_token ด้านบน</li>
              <li>เปิดไฟล์ <code>backend/.env</code></li>
              <li>วางค่าลงใน <code>GOOGLE_REFRESH_TOKEN=ค่าที่คัดลอก</code></li>
              <li>Restart server</li>
              <li>ทดสอบอัปโหลดไฟล์ได้เลย!</li>
            </ol>
          </div>

          <script>
            function copyToken() {
              const token = document.getElementById('refreshToken').innerText;
              navigator.clipboard.writeText(token);
              alert('Copied refresh_token to clipboard!');
            }
          </script>
        </body>
        </html>
      `);

    } catch (error) {
      console.error('Callback error:', error);
      res.status(500).send(`
        <h1>Error</h1>
        <p>เกิดข้อผิดพลาด: ${error.message}</p>
      `);
    }
  }
};

module.exports = authController;
