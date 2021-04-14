const express = require('express');
const { User } = require('../models');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');
const { registerUser } = require('../middlewares/UserMid');

const UserRouter = express.Router();

UserRouter.get('/', (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

UserRouter.post('/', registerUser, async (req, res) => {
  const resultFind = await User.findOne({ where: { email: req.body.email } });
  if (resultFind) return res.status(409).json({ message: 'Usuário já existe' });
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((user) => createJWTPayload(user))
    .then((payload) => jwtSign(payload, secret, jwtConfig))
    .then((result) => res.status(201).json({ token: result }))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

// ...
module.exports = UserRouter;
