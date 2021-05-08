const AppError = require('../utils/AppError');

const SERVER_ERROR = 500;

function errorHandling(err, req, res, _next) {
  if (err instanceof AppError) {
    console.log(`${req.method} ${req.url} ${err.statusCode}, error: ${err.message}`);
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(`${req.method} ${req.url} ${SERVER_ERROR}, error: ${err.toString()}`);
  return res.status(SERVER_ERROR).json({ message: 'Internal Server Error' });
}

module.exports = errorHandling;
