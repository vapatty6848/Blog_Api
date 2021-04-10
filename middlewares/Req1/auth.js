const validateToken = require('./validateToken');

const errorMsg = (status, mess) => ({ status, message: mess });
const auth = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next(errorMsg('missing auth token'));
  const checkToken = validateToken(token);
  if (!checkToken) return next(errorMsg('jwt malformed'));
  req.infoUser = checkToken;
  next();
};

module.exports = auth;
