const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/appErrors');

const secret = 'secret';

const missingToken = new AppError(401, 'Token não encontrado');
const invalidToken = new AppError(401, 'Token expirado ou inválido');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next(missingToken);

    const { email, id } = jwt.verify(token, secret);
    if (!email) return next(invalidToken);

    const isUserValid = await User.findOne({ where: { email } });
    if (!isUserValid) return next(invalidToken);

    req.user = { email, userId: id };
    return next();
  } catch (err) {
    return next(err);
  }
};
