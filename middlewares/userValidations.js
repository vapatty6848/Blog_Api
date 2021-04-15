const { User } = require('../models');

const BAD_REQUEST = 400;

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(BAD_REQUEST)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(BAD_REQUEST)
      .json({ message: '"email" is required' });
  }
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: '"email" must be a valid email' });
  }

  next();
};
const emailRepeat = async (email) => User.findOne({ where: { email } });

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(BAD_REQUEST)
      .json({ message: '"password" is not allowed to be empty' });
  }
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
  emailRepeat,
};
