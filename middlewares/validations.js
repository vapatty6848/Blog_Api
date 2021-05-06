const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const regEx = /\w{3,20}@[a-z]{2,8}.[a-z]{2,8}/gm;

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"email" is required' });
  }
  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" is required' });
  }
  if (!regEx.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  const verifyemail = await User.findOne({ where: { email } });
  if (verifyemail) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Usuário já existe' });
  }
  next();
};

module.exports = {
  validateUser,
};
