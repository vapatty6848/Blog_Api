const { Router } = require('express');

const router = Router();
const { Users } = require('../models');
const userService = require('../services/userService');
const { createToken } = require('../auth/tokenConfig');

router.post('/user', userService.dataValidate, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });

  const token = createToken(user);

  return res.status(201).json({ token });
});

router.get('/', async (req, res) => {
  const users = await Users.findAll();

  return res.status(200).json(users);
});

router.post('/login', userService.loginValidate, async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user.password !== password || user.email !== email) return res.status(400).json({ message: 'Campos inválidos' });

  const token = createToken(user);

  return res.status(200).json({ token });
});

module.exports = router;
