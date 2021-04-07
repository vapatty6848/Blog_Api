const { User } = require('../database/models');

const { CONFLICT } = require('../errors/status');

const validateEmail = (email, res) => {
  if (!email || email.length === 0) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
};

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  validateEmail(email, res);

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password && password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (displayName && displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const userByEmail = await User.findOne({ where: { email } });

  if (userByEmail) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }

  next();
};

module.exports = validateCreateUser;
