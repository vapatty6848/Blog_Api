const validateJWT = require('../auth/validateJWT');
const statusCode = require('../dicts/statusCodesHTTP');

async function tokenValidation(request, response, next) {
  const token = request.headers.authorization;
  const validation = await validateJWT(token);
  if (validation.result === 'missing') {
    return next({
      code: statusCode.UNAUTHORIZED,
      message: 'Token não encontrado',
    });
  }

  if (validation.result === 'invalid') {
    return next({
      code: statusCode.UNAUTHORIZED,
      message: 'Token expirado ou inválido',
    });
  }
  response.locals.authenticatedUser = validation.result;
  return next();
}

module.exports = tokenValidation;
