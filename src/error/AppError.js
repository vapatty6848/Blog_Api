function AppError(message, status = 400) {
  return {
    message, status,
  };
}

module.exports = AppError;
