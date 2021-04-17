const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const CustomErr = require('../utils/customErr');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.TOKEN_SECRET || 'randomKey';

const generateToken = (email, userId) => {
  const user = {
    email,
    userId,
  };

  return jwt.sign({ data: user }, secret, jwtConfig);
};

const noToken = new CustomErr(StatusCodes.UNAUTHORIZED, 'Token não encontrado');
const invalidToken = new CustomErr(StatusCodes.UNAUTHORIZED, 'Token expirado ou inválido');

const validateToken = (req, token, next) => {
  if (!token) return next(noToken);

  try {
    const { data } = jwt.verify(token, secret);
    req.email = data.email;
    req.userId = data.userId;
  } catch (err) {
    return next(invalidToken);
  }
};

module.exports = {
  generateToken,
  validateToken,
};
