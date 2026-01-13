/**
 * Auth Controller
 * Handles both user authentication and Google OAuth authorization
 */

const googleDriveService = require('../services/googleDrive.service');
const dbService = require('../services/db.service');
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../utils/jwt');

const authController = {
  /**
   * User Login
   * POST /api/auth/login
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      // Find user in database
      const user = await dbService.findUserByUsername(username);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password'
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password'
        });
      }

      // Generate JWT token
      const token = generateToken({
        userId: user.id,
        username: user.username,
        role: user.role
      }, '24h');

      // Return success response
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          role: user.role,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  /**
   * Verify Token
   * GET /api/auth/verify
   */
  verifyUserToken: (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      const payload = verifyToken(token);

      if (!payload) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token',
          code: 'AUTH_EXPIRED'
        });
      }

      res.json({
        success: true,
        user: {
          userId: payload.userId,
          username: payload.username,
          role: payload.role
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  /**
   * User Registration
   * POST /api/auth/register
   */
  register: async (req, res) => {
    try {
      const { fullName, email, username, password } = req.body;

      // Validate input
      if (!fullName || !username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full name, username and password are required'
        });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters'
        });
      }

      // Check if username already exists
      const existingUser = await dbService.findUserByUsername(username);

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create user in database
      const newUser = await dbService.createUser({
        username,
        passwordHash,
        email: email || null,
        fullName,
        role: 'user'
      });

      console.log('[AUTH] New user registered:', username);

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          fullName: newUser.full_name,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  /**
   * Logout (client-side will remove token)
   * POST /api/auth/logout
   */
  logout: (req, res) => {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  },

  /**
   * Forgot Password / Reset Password
   * POST /api/auth/forgot-password
   */
  forgotPassword: async (req, res) => {
    try {
      const { username, newPassword } = req.body;

      // Validate input
      if (!username || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Username and new password are required'
        });
      }

      // Validate password length
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters'
        });
      }

      // Find user in database
      const user = await dbService.findUserByUsername(username);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // Update user password
      await dbService.updateUser(user.id, {
        passwordHash
      });

      console.log('[AUTH] Password reset for user:', username);

      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },
  /**
   * Get Google OAuth URL
   * GET /api/auth/google
   */
  getAuthUrl: (req, res) => {
    try {
      const authUrl = googleDriveService.getAuthUrl();

      // Return HTML page with clickable link
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Google Drive Authorization</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 50px auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            h1 {
              color: #667eea;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              margin-bottom: 30px;
            }
            .step {
              background: #f8f9fa;
              padding: 15px;
              margin: 15px 0;
              border-left: 4px solid #667eea;
              border-radius: 4px;
            }
            .step h3 {
              margin-top: 0;
              color: #667eea;
            }
            .auth-btn {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 18px;
              font-weight: bold;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              transition: all 0.3s ease;
              margin: 20px 0;
            }
            .auth-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .emoji {
              font-size: 24px;
              margin-right: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1><span class="emoji">🔐</span>Google Drive Authorization</h1>
            <p class="subtitle">สร้าง Refresh Token ใหม่สำหรับเชื่อมต่อ Google Drive</p>

            <div class="step">
              <h3>📋 ขั้นตอนการทำ:</h3>
              <ol>
                <li>คลิกปุ่มด้านล่างเพื่อไปยังหน้า Google Authorization</li>
                <li>เลือก Google Account ที่ต้องการใช้</li>
                <li>กด "อนุญาต" (Allow) ให้แอปเข้าถึง Google Drive</li>
                <li>ระบบจะ redirect กลับมาพร้อม Refresh Token ใหม่</li>
                <li>Copy token ไปใส่ในไฟล์ .env แล้ว restart server</li>
              </ol>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${authUrl}" class="auth-btn">
                <span class="emoji">🚀</span> เริ่มต้น Authorization
              </a>
            </div>

            <div class="warning">
              <strong>⚠️ หมายเหตุ:</strong> หลังจากได้ Refresh Token แล้ว อย่าลืม:
              <ul>
                <li>วาง token ใน <code>backend/.env</code> ที่บรรทัด <code>GOOGLE_REFRESH_TOKEN=</code></li>
                <li>Restart backend server (กด Ctrl+C แล้วรัน <code>node server.js</code> ใหม่)</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `);
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
