const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/appErrors');

const secret = 'whatever';

const missingToken = new AppError(422, 'missing auth token');
const invalidToken = new AppError(400, 'jwt malformed');
const invalidEntry = new AppError(422, 'Invalid entries. Try again.');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next(missingToken);

    const payload = jwt.verify(token, secret);
    if (!payload.data) return next(invalidToken);

    const { data: { email } } = payload;
    const isUserValid = await User.findOne({ where: { email } });
    if (!isUserValid) return next(invalidEntry);

    req.user = email;
    return next();
  } catch (err) {
    return next(err);
  }
};
