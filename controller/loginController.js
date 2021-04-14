const express = require('express');
const { User } = require('../models');
const { verifylogin } = require('../middlewares/UserMid');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../auth/ValidateToken');

const loginRouter = express.Router();

loginRouter.post('/', verifylogin, async (req, res) => {
  const resultFind = await User.findOne({ where: { email: req.body.email } });

  if (resultFind) res.status(400).json({ message: 'Campos inválidos' });

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

module.exports = loginRouter;
