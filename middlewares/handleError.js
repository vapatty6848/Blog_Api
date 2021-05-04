const DEFAULT_ERR = {
  code: 500,
  message: 'Internal Server Error',
};

module.exports = (
  {
    code = DEFAULT_ERR.code,
    message = DEFAULT_ERR.message,
  },
  _req,
  res,
  _next,
) => (
  res.status(code).json({ message })
);
