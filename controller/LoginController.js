const { Router } = require('express');
const jwt = require('jsonwebtoken');

const secret = 'cabeça';

const jwtConfig = {
  expiresIn: '8d',
  algorithm: 'HS256',
};

const router = Router();

const { Users } = require('../models');
const userValidate = require('../utils/userValidation');

const statusLogin = 200;
const errStatus = 400;

router.post('/', userValidate.loginValidation, async (req, res) => {
  const { email, password } = req.body;

  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) {
    return res.status(errStatus).json({ message: 'Campos inválidos' });
  }
  console.log('passei pelo userExists');

  const payload = {
    email,
    password,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  await Users.findOne({ where: payload });

  res.status(statusLogin).send({ token });
});

module.exports = router;
