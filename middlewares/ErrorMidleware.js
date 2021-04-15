const ErrorMiddleware = async (err, _req, res, _next) => {
  const internalError = 500;
  res.status(err.status || internalError).json({ message: err.message });
};

module.exports = {
  ErrorMiddleware,
};
