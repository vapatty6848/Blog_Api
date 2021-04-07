const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateNewUser } = require('../middlewares/validateNewUser');
const { validateToken } = require('../middlewares/auth');

const UserRouter = new Router();
const jwtConfig = {
  algorithm: 'HS256',
};

UserRouter.get('/', validateToken, async (req, res) => {
  const allUsers = await User.findAll({});

  return res.status(200).json(allUsers);
});

UserRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

UserRouter.post('/', validateNewUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) return res.status(409).json({ message: 'Usuário já existe' });

  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ data: [displayName, email, password, image] }, 'Xavozo', jwtConfig);

  return res.status(201).json({ token });
});

module.exports = { UserRouter };
