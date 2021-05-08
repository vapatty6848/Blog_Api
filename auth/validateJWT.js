const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED } = require('../utils/statusCodeHandler');
const { secret } = require('../utils/token');

const verifyToken = rescue(async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response
      .status(UNAUTHORIZED.code)
      .json({ message: UNAUTHORIZED.message.tokenNotFound });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return response
        .status(UNAUTHORIZED.code)
        .json({ message: UNAUTHORIZED.message.invalidToken });
    }

    request.user = decoded;
  });

  return next();
});

module.exports = {
  verifyToken,
};
