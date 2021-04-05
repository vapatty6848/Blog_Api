const validateToken = require('../auth/validateToken');

const checkAuthorization = (req, res, next) => {
  const unauthorized = 401;
  const { authorization: token } = req.headers;
  const payload = validateToken(token);
  if (!token) return res.status(unauthorized).json({ message: 'missing auth token' });
  if (!payload) return res.status(unauthorized).json({ message: 'jwt malformed' });
  req.payload = payload; // deixa valor do payload no req.
  next();
};

module.exports = {
  checkAuthorization,
};
