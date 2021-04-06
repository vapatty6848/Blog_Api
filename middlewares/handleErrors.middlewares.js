const ERROR = require('./helpers/errors');

const checkCustomError = (message) => {
  const arr = message.split('_');
  return arr[0] === 'C' && arr[1] === 'ERR';
};

const handleErrorObject = (error, boolean) => {
  if (!boolean) return error;
  return { ...ERROR[error.err.message], err: error.err.stack };
};

module.exports = (error, _req, res, _next) => {
  const isCustomError = checkCustomError(error.err.message);
  const errorObject = handleErrorObject(error, isCustomError);
  const filterError = {
    status: errorObject.statusCode,
    code: errorObject.customCode,
    message: errorObject.customMessage,
  };
  console.error(filterError);

  const { statusCode, customMessage, customCode } = errorObject;
  const ERR = {
    message: customMessage || 'Erro interno',
    code: customCode || 'INTERNAL_ERROR',
  };

  res.status(statusCode).json(ERR);
};
