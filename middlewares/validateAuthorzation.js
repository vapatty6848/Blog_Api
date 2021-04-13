const jwt = require('jsonwebtoken');
const { statusCode, statusMsg } = require('../utils/dictionary');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === '') {
    return res.status(statusCode.UNAUTHORIZED)
      .send({ message: statusMsg.TOKEN_EMPTY });
  }

  const isToken = jwt.decode(authorization);

  if (!isToken) {
    return res.status(statusCode.UNAUTHORIZED)
      .send({ message: statusMsg.TOKEN_INVALID });
  }
  next();
};
