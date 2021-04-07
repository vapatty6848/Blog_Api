const ErrorMiddleware = async (err, _req, res, _next) => {
  const internalError = 500;
  res.status(err.statusCode || internalError).json(err.message);
};

module.exports = {
  ErrorMiddleware,
};
