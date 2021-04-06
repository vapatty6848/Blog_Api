const validateToken = require('../auth/validateToken');

const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });

    const payload = validateToken(token);

    if (!payload) res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    next();
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
