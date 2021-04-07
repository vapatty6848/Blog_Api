const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = 'segredo';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ statusCode: 401, customMessage: 'tokenNotFound' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.data.userData;

    const user = await User.findAll({ where: { email } });

    if (user.length === 0) {
      return next({ statusCode: 401, customMessage: 'tokenNotFound' });
    }

    next();
  } catch (err) { return next({ statusCode: 401, customMessage: 'invalidToken' }); }
};
