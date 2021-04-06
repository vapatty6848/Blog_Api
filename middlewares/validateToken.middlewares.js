const { verifyToken } = require('../security');
const { C_ERR_INVALID_TOKEN } = require('./helpers/errors');

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error('C_ERR_NO_TOKEN');
    const { sub } = verifyToken(token);
    req.userId = sub;
    return next();
  } catch (err) {
    next({ err, ...C_ERR_INVALID_TOKEN });
  }
};
