const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { SECRET, config } = require('../middlewares/auth');
const { User } = require('../models');
const { validateLogin } = require('../middlewares/validateLogin');

const LoginRouter = new Router();

LoginRouter.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });
  if (password !== user.dataValues.password) return res.status(400).json({ message: 'Campos inválidos' });

  const token = jwt.sign({ data: user }, SECRET, config);

  return res.status(200).json({ token });
});

module.exports = { LoginRouter };
