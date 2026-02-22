/**
 * Global error handler middleware
 * Catches all errors and returns JSON response
 */

function errorHandler(err, req, res, next) {
  const timestamp = new Date().toISOString();
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ Error [${timestamp}]:`, {
    status: statusCode,
    message: message,
    path: req.path,
    method: req.method,
    stack: err.stack
  });

  // Send error response
  res.status(statusCode).json({
    error: message,
    timestamp: timestamp,
    path: req.path,
    statusCode: statusCode
  });
}

/**
 * 404 Not Found handler
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.path}`);
  error.statusCode = 404;
  next(error);
}

module.exports = {
  errorHandler,
  notFoundHandler
};
