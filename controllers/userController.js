const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/createToken');
const userService = require('../services/userService');
const validateToken = require('../auth/validateToken');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const emailNotExist = await userService.emailExist(email);
  if (!emailNotExist) return res.status(409).json({ message: 'Usuário já existe' });
  await User.create({ displayName, email, password, image });
  const payload = { displayName, email, password, image };
  const token = createToken.createToken(payload);
  res.status(201).json({ token });
});

router.get('/', validateToken, async (_req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const users = await User.findByPk(id);
  if (!users) return res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(users);
});

router.delete('/me', validateToken, async (req, res) => {
  const { email } = req.decodedUser;
  await User.destroy(
    {
      where: { email },
    },
  );
  res.status(204).json({ message: 'Usuário não existe' });
});

module.exports = router;
