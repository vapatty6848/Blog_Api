const jwt = require('jsonwebtoken');
const { secret } = require('../../authentication/jwtConfig');
const { status, messages } = require('../../libs/dicts');
const { ThrowError } = require('../errorHandler/utils');

const validateGetUsers = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  try {
    if (!authorization || authorization.length === 0) {
      throw new ThrowError(status.unauthorized, messages.tokenNotFound);
    }
    jwt.verify(authorization, secret);
    next();
  } catch (error) {
    if (error.message === messages.tokenNotFound) {
      next(error);
    }
    res.status(status.unauthorized).json({ message: messages.invalidToken });
  }
};

module.exports = validateGetUsers;
