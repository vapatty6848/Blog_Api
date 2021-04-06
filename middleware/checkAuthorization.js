const validateToken = require('../auth/validateToken');

const checkAuthorization = (req, res, next) => {
  const unauthorized = 400;
  const { authorization: token } = req.headers;
  const payload = validateToken(token);
  if (!payload) return res.status(unauthorized).json({ message: 'jwt malformed' });
  req.payload = token; // deixa valor do payload no req.
  next();
};

module.exports = checkAuthorization;
