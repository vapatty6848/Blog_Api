const express = require('express');
const { User } = require('../models');
const { verifylogin } = require('../middlewares/UserMid');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');

const loginRouter = express.Router();

loginRouter.post('/', verifylogin, async (req, res) => {
  User.findOne(
    {
      where:
      {
        email: req.body.email,
        password: req.body.password,
      },
    },
  ).then((user) => {
    if (user === null) res.status(400).json({ message: 'Campos inválidos' });
    return createJWTPayload(user);
  }).then((payload) => jwtSign(payload, secret, jwtConfig))
    .then((result) => res.status(200).json({ token: result }))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = loginRouter;
