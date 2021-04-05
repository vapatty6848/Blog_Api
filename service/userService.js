const { Users } = require('../models');

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailVerified = regex.test(email);
  return emailVerified;
};

const validateFields = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  if (!displayName || !image) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
  }

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (typeof displayName !== 'string' || displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validateFieldsCreate = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ where: { email } });

  if (existingUser) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!password) return res.status(400).json({ message: '"password" is required' });

  const existingUser = await Users.findOne({ where: { email } });

  if (!existingUser) return res.status(400).json({ message: 'Campos inválidos' });

  next();
};

module.exports = {
  validateFields,
  validateFieldsCreate,
  validateLogin,
};
