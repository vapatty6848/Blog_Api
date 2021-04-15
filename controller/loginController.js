const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { senha, auth } = require('../middleware/valid.TokenJWT');
const { User } = require('../models');
const { validLogin } = require('../middleware/valid.login');

const loginControll = new Router();

loginControll.post('/', validLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });
  if (password !== user.dataValues.password) return res.status(400).json({ message: 'Campos inválidos' });

  const token = jwt.sign({ data: user }, senha, auth);

  return res.status(200).json({ token });
});

module.exports = { loginControll };
