const jwt = require('jsonwebtoken');
const usersService = require('../../services/Users');

const secret = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ statusCode: 401, customMessage: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersService.findUserByEmail(decoded.data.email);

    if (!user) {
      return next({ statusCode: 401, customMessage: 'token user not found' });
    }

    req.user = user;

    next();
  } catch (err) { return next({ statusCode: 401, customMessage: 'jwt malformed' }); }
};