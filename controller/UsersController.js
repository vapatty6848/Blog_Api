const { Router } = require('express');
const jwt = require('jsonwebtoken');

const secret = 'cabeça';

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const router = Router();

const { Users } = require('../models');

const statusCreate = 201;
const statusOK = 200;

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);

  await Users.create({ displayName, email, password, image });

  res.status(statusCreate).send({ token });
});

router.get('/', async (req, res) => {
  const { token } = req.headers.authorization;
  const users = await Users.findAll();

  res.status(statusOK).json(users);
});


module.exports = router;
