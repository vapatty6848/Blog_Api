const ErrorMiddleware = async (err, req, res, _next) => {
  const internalError = 500;
  res.status(err.status || internalError).json({ message: err.message });
};

module.exports = {
  ErrorMiddleware,
};
