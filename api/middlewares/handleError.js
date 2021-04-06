const UNHANDLED_ERROR = 'Internal Error';
const UNHANDLED_ERROR_STATUS = 500;

const errorTypes = [
  {
    error: 'email is required',
    status: 400,
    message: '"email" is required',
  },
  {
    error: 'email must match regular expression',
    status: 400,
    message: '"email" must be a valid email',
  },
  {
    error: 'password is required',
    status: 400,
    message: '"password" is required',
  },
  {
    error: 'password must have length greater than or equal to',
    status: 400,
    message: '"password" length must be 6 characters long',
  },
  {
    error: 'displayName must have length greater than or equal to',
    status: 400,
    message: '"displayName" length must be at least 8 characters long',
  },
  {
    error: 'displayName is required',
    status: 400,
    message: '"displayName" is required',
  },
];

// Usuário já existe
const handleError = (err, _req, res, _next) => {
  console.log(err);
  const error = errorTypes.find((errorType) => err.includes(errorType.error));

  if (error) return res.status(error.status).json({ message: error.message });

  return res.status(UNHANDLED_ERROR_STATUS).json({ error: UNHANDLED_ERROR });
};

module.exports = handleError;
