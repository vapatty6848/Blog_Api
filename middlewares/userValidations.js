const { User } = require('../models');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const validateName = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(BAD_REQUEST)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(BAD_REQUEST)
      .json({ message: '"email" is required' });
  }

  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: '"email" must be a valid email' });
  }

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist !== null) {
    return res.status(CONFLICT)
      .json({ message: 'Usuário já existe' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === null) {
    return res.status(BAD_REQUEST)
      .json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST)
      .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
