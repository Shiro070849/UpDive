/**
 * Hardcoded Users Database
 * In the future, this will be replaced with actual database queries
 */

const users = [
  {
    id: 1,
    username: 'sysadmin',
    password: 'SyS@dm!n', // In production, this should be hashed
    fullName: 'System Administrator',
    role: 'admin',
    email: 'sysadmin@updive.com'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123', // In production, this should be hashed
    fullName: 'Admin User',
    role: 'user',
    email: 'admin@updive.com'
  }
];

/**
 * Find user by username
 */
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

/**
 * Validate user credentials
 */
function validateCredentials(username, password) {
  const user = findUserByUsername(username);

  if (!user) {
    return null;
  }

  // Simple password check (in production, use bcrypt.compare)
  if (user.password === password) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
}

module.exports = {
  users,
  findUserByUsername,
  validateCredentials
};
