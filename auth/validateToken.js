const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../dictionary/statusCode');
const { INVALID_TOKEN, TOKEN_NOT_FOUND } = require('../dictionary/errorMessage');
const { User } = require('../models');

const secret = process.env.TOKEN_SECRET || 'secret123';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json(TOKEN_NOT_FOUND);

  try {
    const decoded = jwt.verify(token, secret);
    const userRegistered = await User.findAll({
      where: { id: decoded.id, email: decoded.email },
      attributes: ['id', 'displayName', 'email'],
    });

    req.user = userRegistered;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
  }
};
