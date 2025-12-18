/**
 * Script to get Google OAuth Refresh Token
 *
 * วิธีใช้:
 * 1. ตั้งค่า GOOGLE_CLIENT_ID และ GOOGLE_CLIENT_SECRET ใน .env ก่อน
 * 2. รัน: node get-refresh-token.js
 * 3. เปิด URL ที่แสดงในเบราว์เซอร์
 * 4. Login และอนุญาต
 * 5. Copy code จาก URL callback
 * 6. รัน: node get-refresh-token.js YOUR_CODE
 */

require('dotenv').config();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:8088/api/auth/callback'
);

const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

async function main() {
  const code = process.argv[2];

  if (!code) {
    // Step 1: Generate Auth URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    });

    console.log('\n========================================');
    console.log('Step 1: Open this URL in your browser:');
    console.log('========================================\n');
    console.log(authUrl);
    console.log('\n========================================');
    console.log('Step 2: After login, copy the "code" from the redirect URL');
    console.log('Step 3: Run again with the code:');
    console.log('   node get-refresh-token.js YOUR_CODE');
    console.log('========================================\n');
  } else {
    // Step 2: Exchange code for tokens
    try {
      const { tokens } = await oauth2Client.getToken(code);

      console.log('\n========================================');
      console.log('SUCCESS! Add these to your .env file:');
      console.log('========================================\n');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
      console.log('\n========================================\n');

      if (tokens.access_token) {
        console.log('Access Token (temporary):');
        console.log(tokens.access_token.substring(0, 50) + '...');
      }
    } catch (error) {
      console.error('Error getting tokens:', error.message);
    }
  }
}

main();
