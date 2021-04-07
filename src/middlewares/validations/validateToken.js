const jwt = require('jsonwebtoken');
const { secret } = require('../../authentication/jwtConfig');
const { status, messages } = require('../../libs/dicts');
const { ThrowError } = require('../errorHandler/utils');
const { Users } = require('../../../models');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || authorization.length === 0) {
      throw new ThrowError(status.unauthorized, messages.tokenNotFound);
    }
    const isUserValid = jwt.verify(authorization, secret);
    const { email } = isUserValid.userData;
    const user = await Users.findOne({ where: { email } });
    req.body.user = user.dataValues;
    next();
  } catch (error) {
    if (error.message === messages.tokenNotFound) {
      next(error);
    } else {
      res.status(status.unauthorized).json({ message: messages.invalidToken });
    }
  }
};

module.exports = validateToken;
