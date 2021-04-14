const validateToken = require('../auth/validateToken');

const statusUnauthorized = 401;

const verifyAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  console.log(token);

  if (!token) return res.status(statusUnauthorized).json({ message: 'missing auth token' });

  const payload = validateToken(token);

  if (!payload) return res.status(statusUnauthorized).json({ message: 'jwt malformed' });

  next();
};

module.exports = verifyAuthorization;
