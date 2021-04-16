const { User } = require('../models');

const emailAlreadyExists = async (req, res, next) => {
  const checkData = await User.findOne({ where: { email: req.body.email } });
  if (checkData) return res.status(409).json({ message: 'Usuário já existe' });
  next();
};

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  next();
};

const validateLoginCredentials = (req, res, next) => {
  const { password, email } = req.body;

  if (!password || password.length === 0) return res.status(400).json({ message: '"password" is required' });

  if (password.length < 6) return res.status(400).json({ message: '"password" length must be 6 characters long' });

  if (!email || email.length === 0) return res.status(400).json({ message: '"email" is required' });
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!regexEmail.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  next();
};

const validateCreateUSer = [
  validateLoginCredentials,
  validateEmail,
  validateName,
  emailAlreadyExists,
];

module.exports = validateCreateUSer;
