const express = require('express');
const { User } = require('../models');
const { registerUser, verifyToken } = require('../middlewares/UserMid');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');

const userRouter = express.Router();

userRouter.get('/', verifyToken, (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

userRouter.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  User.findOne({ where: { id } })
    .then((users) => {
      if (users) return res.status(200).json(users);
      return res.status(404).json({ message: 'Usuário não existe' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

userRouter.post('/', registerUser, async (req, res) => {
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

module.exports = userRouter;
