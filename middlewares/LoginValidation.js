const LoginService = require('../services/LoginService');

const LoginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) return res.status(400).json({ message: '"email" is required' });
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (password === undefined) return res.status(400).json({ message: '"password" is required' });
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  const user = await LoginService(email, password);
  if (!user || user.length === 0) return res.status(400).json({ message: 'Campos inválidos' });
  req.user = user;
  next();
};

module.exports = LoginValidation;
