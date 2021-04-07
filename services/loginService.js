const { Users } = require('../models');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  const sucess = await Users.findOne({ where: { email, password } });
  if (!sucess) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  next();
};

module.exports = {
  validateLogin,
};
