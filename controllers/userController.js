const { Router } = require('express');

const router = Router();
const { Users } = require('../models');
const validations = require('../services/validations');
const { createToken, validateToken } = require('../auth/token');

router.post('/user', validations.validate, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await Users.create({ displayName, email, password, image });
  const token = createToken(user);
  return res.status(201).json({ token });
});

router.post('/login', validations.validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (user.password !== password || user.email !== email) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  const token = createToken(user);
  return res.status(200).json({ token });
});

router.get('/user', validateToken, async (req, res) => {
  const users = await Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return res.status(200).json(users);
});

module.exports = router;
