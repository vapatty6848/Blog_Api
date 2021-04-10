const jwt = require('jsonwebtoken');
const UserServices = require('../../services/UserServices');

const secret = 'segredo';
const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ statusCode: UNAUTHORIZED, customMessage: 'tokenNotFound' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.data;
    const user = await UserServices.getUserByEmail(email);

    if (user === null) {
      return next({ statusCode: UNAUTHORIZED, customMessage: 'tokenNotFound' });
    }

    req.userId = user.dataValues.id;

    next();
  } catch (err) { return next({ statusCode: UNAUTHORIZED, customMessage: 'invalidToken' }); }
};
