const { User } = require('../models');

const validationLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (email === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  const findUser = await User.findAll({ where: { email } });
  if (findUser.length === 0) return res.status(409).json({ message: 'Campos inválidos' });
  if (findUser[0].password !== password) return res.status(409).json({ message: 'Campos inválidos' });
  return res.status(200).json({ token: req.token });
};

module.exports = validationLogin;
