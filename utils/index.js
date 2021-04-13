const { nameHasValidLength, emailIsValid, passwordHasValidLength } = require('./userValidations');

// const jwt = require('jsonwebtoken');
// const UserModel = require('../Model/userModel');

require('dotenv').config();

// const secret = process.env.SECRET || 'secretToken';

// const NOT_FOUND = 404;
// const UNAUTHORIZED = 401;

const throwThisError = (code, msg) => {
  const err = new Error(msg);
  err.codeStatus = code;
  throw err;
};

// const verifyToken = async (req, res, next) => {
//   const { token } = req.body;
//   if (!token) throwThisError(UNAUTHORIZED, 'missing auth token');

//   try {
//     const decoded = jwt.verify(token, secret);
//     const user = await UserModel.findUserByEmail(decoded.user.email);
//     if (!user) throwThisError(NOT_FOUND, 'Token user not found');
//     req.user = { ...decoded.user, token };
//   } catch (err) {
//     throwThisError(UNAUTHORIZED, 'jwt malformed');
//   }
//   next();
// };

module.exports = {
  throwThisError,
  nameHasValidLength,
  emailIsValid,
  passwordHasValidLength,
  // verifyToken,
};
