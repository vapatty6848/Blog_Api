const AppError = require('../../error/AppError');
const validateToken = require('../../utils/validateToken');

const validateAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, '---');
  if (!token) next(AppError('Token não encontrado', 401));
  try {
    const response = validateToken(token);
    res.locals.user = {};
    res.locals.user.id = response.id;
    next();
  } catch (err) {
    console.log('inside err');
    console.log(err);
    next(err);
  }
};

module.exports = validateAuth;
