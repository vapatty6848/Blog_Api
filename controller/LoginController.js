const { Router } = require('express');
const jwt = require('jsonwebtoken');

const secret = 'cabeça';

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const router = Router();

const { Users } = require('../models');
const userValidate = require('../utils/userValidation');

const statusLogin = 200;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  await userValidate.loginValidation();

  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);

  await Users.findAll({ where: email && password });

  res.status(statusLogin).send({ token });
});

module.exports = router;
