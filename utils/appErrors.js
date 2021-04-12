module.exports = class AppError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
};
