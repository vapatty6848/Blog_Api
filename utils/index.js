const jwt = require('jsonwebtoken');
const { nameHasValidLength, emailIsValid, passwordHasValidLength } = require('./userValidations');
require('dotenv').config();

const secret = process.env.SECRET || 'secretToken';

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

// const { findByEmail } = require('../services/UserServices');
const { User } = require('../models');

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(`USER: ${user}`);
  return user;
};

const throwThisError = (code, msg) => {
  const err = new Error(msg);
  err.codeStatus = code;
  throw err;
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(authorization, secret);
    const user = await findByEmail(decoded.user.email);
    console.log(`USER: ${user}`);
    if (!user) return res.status(UNAUTHORIZED).json(NOT_FOUND, 'Token user not found');
    req.user = { ...decoded.user, authorization };
  } catch (err) {
    console.log(err);
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = {
  throwThisError,
  nameHasValidLength,
  emailIsValid,
  passwordHasValidLength,
  verifyToken,
};
