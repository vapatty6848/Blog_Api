const statusCode = require('../dicts/statusCodesHTTP');
const UserService = require('../services/UserService');

async function validateUniqueEmail(request, response, next) {
  const { email: requestEmail } = request.body;
  const userRetrieved = await UserService.findByEmail(requestEmail);
  if (requestEmail === userRetrieved.email) {
    return next({
      code: statusCode.CONFLICT,
      message: 'Usuário já existe',
    });
  }
  return next();
}

module.exports = validateUniqueEmail;
