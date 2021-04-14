const express = require('express');
const { User } = require('../models');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');
// const { registerUser } = require('../middlewares/UserMid');

const LoginRouter = express.Router();

LoginRouter.post('/', async (req, res) => {
  User.findOne(
    {
      where:
      {
        email: req.body.email,
        password: req.body.password,
      },
    },
  ).then((user) => {
    if (user === null) res.status(400).json({ message: 'Usuário não existe' });
    return createJWTPayload(user);
  }).then((payload) => jwtSign(payload, secret, jwtConfig))
    .then((result) => res.status(201).json({ token: result }))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

// ...
module.exports = LoginRouter;
