const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');
const { registerUser, verifyToken } = require('../middlewares/UserMid');

const UserRouter = express.Router();

UserRouter.get('/', verifyToken, async (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
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

UserRouter.get('/:id', verifyToken, (req, res) => {
  User.findOne(
    {
      where:
      {
        id: req.params.id,
      },
    },
  ).then((user) => {
    if (user === null) return res.status(404).json({ message: 'Usuário não existe' });
    return res.status(200).json(user);
  })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

UserRouter.delete('/me', verifyToken, (req, res) => {
  const token = req.headers.authorization;
  const { userData } = jwt.verify(token, secret);
  console.log(userData, 'userDataaaaaa');
  const tokenUserEmail = userData.id;
  console.log(tokenUserEmail, 'resultado final');
  User.destroy(
    {
      where:
      {
        id: tokenUserEmail,
      },
    },
  ).then((user) => {
    if (user === null) return res.status(404).json({ message: 'Usuário não existe' });
    return res.status(204).end();
  })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

// ...
module.exports = UserRouter;
