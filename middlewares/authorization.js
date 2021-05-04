const { validateToken } = require('../token');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  validateToken(req, token, next);
  next();
};
