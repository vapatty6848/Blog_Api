const { Router } = require('express');
const { User } = require('../models');
const validateUser = require('../middlewares/validateUser');
const { createToken, validateToken } = require('../auth');
const findByEmail = require('../utils/findByEmail');

const routerUser = Router();

routerUser.get('/', validateToken, async (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    });
});

routerUser.get('/:id', validateToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(user);
});

routerUser.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = { displayName, email, password, image };
  await User.create(newUser);

  const [{ dataValues }] = await findByEmail(email);
  const token = createToken(dataValues);

  res.status(201).json({ token });
});

routerUser.delete('/me', validateToken, async (req, res) => {
  const { id } = req.user;

  User.destroy({ where: { id } });
  res.status(204).json({});
});

module.exports = routerUser;
