const { verifyToken } = require('../security');
const { C_ERR_INVALID_TOKEN } = require('./helpers/errors');

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error('C_ERR_NO_TOKEN');
    const verification = verifyToken(token);
    req.userId = verification;
    return next();
  } catch (err) {
    next({ err, ...C_ERR_INVALID_TOKEN });
  }
};
