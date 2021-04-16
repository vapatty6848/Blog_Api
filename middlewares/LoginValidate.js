const { User } = require('../models');

const validateCredentials = async (body, user) => {
  const { email, password } = body;
  if (!user) return false;
  if (!email || email !== user.email) return false;
  if (!password || password !== user.password) return false;

  return true;
};

const validateUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  const result = await validateCredentials(req.body, user);
  if (!result) return res.status(400).json({ message: 'Campos inválidos' });

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email !== undefined && email.length === 0) return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password !== undefined && password.length === 0) return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
};

const LoginValidate = [
  validateEmail,
  validatePassword,
  validateUser,
];

module.exports = LoginValidate;
