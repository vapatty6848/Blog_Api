const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

class AppError {
  constructor(message, statusCode = BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
