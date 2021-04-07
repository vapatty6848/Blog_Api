const jwt = require('jsonwebtoken');
const secret = 'blogsAPI';

const headers = {
  algorithm: 'HS256',
  expiresIn: '30m',
};

const createToken = (payload) => {
  const token = jwt.sign(payload.dataValues, secret, headers);
  return token;
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return err;
  }
};

const authorizationToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  const payload = validateToken(authorization);
  if (!payload) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
}

module.exports = {
  createToken,
  authorizationToken,
};
