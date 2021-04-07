const BAD_REQUEST = 400;

class AppError {
  constructor(message, status = BAD_REQUEST) {
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
