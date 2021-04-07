const AppError = require('../errors/AppError');

function handleErrors(err, _request, response, _next) {
  if (err instanceof AppError) {
    return response.status(err.status).json({ message: err.message });
  }

  console.log(err);

  const SERVER_ERROR = 500;

  return response.status(SERVER_ERROR).json({ error: 'Internal Server Error' });
}

module.exports = handleErrors;
