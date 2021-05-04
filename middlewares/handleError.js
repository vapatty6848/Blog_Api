const CustomErr = require('../utils/customErr');

const DEFAULT_ERR = {
  code: 500,
  message: 'Internal Server Error',
};

module.exports = (
  err,
  _req,
  res,
  _next,
) => {
  const { code, message } = err;

  if (err instanceof CustomErr) return res.status(code).json({ message });

  return res.status(DEFAULT_ERR.code).json({ message: DEFAULT_ERR.message });
};
