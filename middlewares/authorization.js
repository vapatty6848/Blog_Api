const { verifyToken } = require('../helpers/utils');
const validations = require('../helpers/validations');

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = validations.requiredTokenError();
    return res.status(err.status).json(err);
  }
  try {
    verifyToken(token);
    return next();
  } catch (error) {
    const err = validations.invalidTokenError();
    return res.status(err.status).json(err);
  }
};

module.exports = authorization;
