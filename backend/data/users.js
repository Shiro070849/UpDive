/**
 * Hardcoded Users Database
 * In the future, this will be replaced with actual database queries
 */

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin1234', // In production, this should be hashed
    fullName: 'Administrator',
    role: 'admin',
    email: 'admin@example.com'
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
