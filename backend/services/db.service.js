/**
 * Database Service
 * Connect SQL Server and manage Users
 */

const sql = require('mssql');
const config = require('../config/Mssql.config');

// Connection pool
let pool = null;

/**
 * Connect to Database
 */
async function connect() {
  try {
    if (pool) {
      return pool;
    }
    pool = await sql.connect(config.sql);
    console.log('[DB] Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('[DB] Connection error:', error.message);
    throw error;
  }
}

/**
 * Close connection
 */
async function close() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('[DB] Connection closed');
    }
  } catch (error) {
    console.error('[DB] Error closing:', error.message);
  }
}

// ==================== User Functions ====================

/**
 * Find user by username
 */
async function findUserByUsername(username) {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM updive.Users WHERE username = @username AND is_active = 1');

    return result.recordset[0] || null;
  } catch (error) {
    console.error('[DB] Error finding user:', error.message);
    throw error;
  }
}

/**
 * Find user by id
 */
async function findUserById(id) {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM updive.Users WHERE id = @id');

    return result.recordset[0] || null;
  } catch (error) {
    console.error('[DB] Error finding user by id:', error.message);
    throw error;
  }
}

/**
 * Create new user
 */
async function createUser({ username, passwordHash, email, fullName, role = 'user' }) {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .input('username', sql.NVarChar, username)
      .input('password_hash', sql.NVarChar, passwordHash)
      .input('email', sql.NVarChar, email || null)
      .input('full_name', sql.NVarChar, fullName)
      .input('role', sql.NVarChar, role)
      .query(`
        INSERT INTO updive.Users (username, password_hash, email, full_name, role)
        OUTPUT INSERTED.id, INSERTED.username, INSERTED.email, INSERTED.full_name, INSERTED.role, INSERTED.created_at
        VALUES (@username, @password_hash, @email, @full_name, @role)
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('[DB] Error creating user:', error.message);
    throw error;
  }
}

/**
 * Update user
 */
async function updateUser(id, updates) {
  try {
    const poolConnection = await connect();
    const request = poolConnection.request().input('id', sql.Int, id);

    const setClauses = ['updated_at = GETDATE()'];

    if (updates.fullName) {
      request.input('full_name', sql.NVarChar, updates.fullName);
      setClauses.push('full_name = @full_name');
    }
    if (updates.email) {
      request.input('email', sql.NVarChar, updates.email);
      setClauses.push('email = @email');
    }
    if (updates.passwordHash) {
      request.input('password_hash', sql.NVarChar, updates.passwordHash);
      setClauses.push('password_hash = @password_hash');
    }
    if (updates.role) {
      request.input('role', sql.NVarChar, updates.role);
      setClauses.push('role = @role');
    }
    if (typeof updates.isActive === 'boolean') {
      request.input('is_active', sql.Bit, updates.isActive);
      setClauses.push('is_active = @is_active');
    }

    const query = `UPDATE updive.Users SET ${setClauses.join(', ')} WHERE id = @id`;
    await request.query(query);

    return await findUserById(id);
  } catch (error) {
    console.error('[DB] Error updating user:', error.message);
    throw error;
  }
}

/**
 * Get all users
 */
async function getAllUsers() {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .query('SELECT id, username, email, full_name, role, is_active, created_at FROM updive.Users ORDER BY created_at DESC');

    return result.recordset;
  } catch (error) {
    console.error('[DB] Error getting users:', error.message);
    throw error;
  }
}

// ==================== Upload Log Functions ====================

/**
 * Create upload log
 */
async function createUploadLog({ userId, fileName, originalName, fileSize, mimeType, driveFileId, driveUrl, status = 'success' }) {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .input('user_id', sql.Int, userId)
      .input('file_name', sql.NVarChar, fileName)
      .input('original_name', sql.NVarChar, originalName)
      .input('file_size', sql.BigInt, fileSize)
      .input('mime_type', sql.NVarChar, mimeType)
      .input('drive_file_id', sql.NVarChar, driveFileId)
      .input('drive_url', sql.NVarChar, driveUrl)
      .input('status', sql.NVarChar, status)
      .query(`
        INSERT INTO updive.UploadLogs (user_id, file_name, original_name, file_size, mime_type, drive_file_id, drive_url, status)
        OUTPUT INSERTED.*
        VALUES (@user_id, @file_name, @original_name, @file_size, @mime_type, @drive_file_id, @drive_url, @status)
      `);

    return result.recordset[0];
  } catch (error) {
    console.error('[DB] Error creating upload log:', error.message);
    throw error;
  }
}

/**
 * Get upload logs by user id
 */
async function getUploadLogsByUserId(userId) {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .input('user_id', sql.Int, userId)
      .query('SELECT * FROM updive.UploadLogs WHERE user_id = @user_id ORDER BY uploaded_at DESC');

    return result.recordset;
  } catch (error) {
    console.error('[DB] Error getting upload logs:', error.message);
    throw error;
  }
}

/**
 * Get all upload logs
 */
async function getAllUploadLogs() {
  try {
    const poolConnection = await connect();
    const result = await poolConnection.request()
      .query(`
        SELECT ul.*, u.username, u.full_name
        FROM updive.UploadLogs ul
        LEFT JOIN updive.Users u ON ul.user_id = u.id
        ORDER BY ul.uploaded_at DESC
      `);

    return result.recordset;
  } catch (error) {
    console.error('[DB] Error getting all upload logs:', error.message);
    throw error;
  }
}

module.exports = {
  connect,
  close,
  findUserByUsername,
  findUserById,
  createUser,
  updateUser,
  getAllUsers,
  createUploadLog,
  getUploadLogsByUserId,
  getAllUploadLogs
};
