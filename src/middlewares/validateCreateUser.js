const { User } = require('../database/models');

const { CONFLICT, BAD_REQUEST } = require('../errors/status');

const validateEmail = (email, res) => {
  if (!email || email.length === 0) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  }
};

const validatePassword = (password, res) => {
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  }
  if (password && password.length < 6) {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
};

const validateName = (displayName, res) => {
  if (displayName && displayName.length < 8) {
    return res.status(BAD_REQUEST).json({ message: '"displayName" length must be at least 8 characters long' });
  }
};

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  validateEmail(email, res);

  validatePassword(password, res);

  validateName(displayName, res);

  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }

  next();
};
