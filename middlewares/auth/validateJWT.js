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
    const { email } = decoded.data;
    const user = await User.findOne({ where: { email } });

    if (user === null) {
      return next({ statusCode: 401, customMessage: 'tokenNotFound' });
    }

    req.userId = user.dataValues.id;

    next();
  } catch (err) { return next({ statusCode: 401, customMessage: 'invalidToken' }); }
};
