/**
 * Example Middleware
 * This is a sample middleware - replace with your actual middleware
 */

const exampleMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

module.exports = exampleMiddleware;
