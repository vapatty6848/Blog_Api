const ERROR = require('./helpers/errors');

/* HandleError middleware feito pelo monstrão
Phelipe Ohlsen e usado em nosso projeto Trybeer.
Coisa phyna! */

const checkCustomError = (message) => {
  const arr = message.split('_');
  return arr[0] === 'C' && arr[1] === 'ERR';
};

const handleErrorObject = (error, boolean) => {
  if (!boolean) return error;
  const customError = ERROR[error.err.message];
  return { ...customError, err: error.err.stack };
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
    statusCode: statusCode || 500,
  };

  res.status(ERR.statusCode).json(ERR);
};
