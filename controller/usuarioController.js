const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validUsuario } = require('../middleware/valid.NovoUsuario');
const { validToken } = require('../middleware/valid.TokenJWT');

const usuarioControll = new Router();

usuarioControll.delete('/me', validToken, async (req, res) => {
  const { email } = req.payload.data;
  const userDeleted = await User.destroy({ where: { email } });
  return res.status(204).json(userDeleted);
});

usuarioControll.get('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
});

usuarioControll.get('/', validToken, async (req, res) => {
  const todosUsuarios = await User.findAll({});
  return res.status(200).json(todosUsuarios);
});

usuarioControll.post('/', validUsuario, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'Usuário já existe' });
  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: [displayName, email, password, image] }, 'Xavozo', { algorithm: 'HS256' });
  return res.status(201).json({ token });
});

module.exports = { usuarioControll };
