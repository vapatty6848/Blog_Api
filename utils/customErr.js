module.exports = class CustomErr {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
};
