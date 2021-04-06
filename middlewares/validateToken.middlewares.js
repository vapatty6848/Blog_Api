const { verifyToken } = require('../security');

const error = {
  noToken: 'C_ERR_NO_TOKEN',
  invalidTOken: 'C_ERR_INVALID_TOKEN',
};

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error(error.noToken);
    const { sub } = verifyToken(token);
    req.userId = sub;
    return next();
  } catch (err) {
    next({ err });
  }
};
