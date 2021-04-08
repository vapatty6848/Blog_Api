const expectedError = (error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status).send({ message });
};
module.exports = expectedError;
