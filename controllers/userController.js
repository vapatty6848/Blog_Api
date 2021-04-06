const { Router } = require('express');

const router = Router();
const { Users } = require('../models');
const userService = require('../services/userService');
const { createToken, validateToken } = require('../auth/tokenConfig');

router.post('/user', userService.dataValidate, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });

  const token = createToken(user);

  return res.status(201).json({ token });
});

router.post('/login', userService.loginValidate, async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user.password !== password || user.email !== email) return res.status(400).json({ message: 'Campos inválidos' });

  const token = createToken(user);

  return res.status(200).json({ token });
});

router.get('/user', validateToken, async (req, res) => {
  const users = await Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

  return res.status(200).json(users);
});

router.get('/user/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });

  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: 'Usuário não existe' });
});

router.delete('/user/me', validateToken, async (req, res) => {
  const { id } = req.decodedUser;
  // console.log(req.decodedUser.id);

  await Users.destroy({ where: { id } });

  return res.status(204).end();
});

module.exports = router;
