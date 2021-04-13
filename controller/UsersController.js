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

const statusCreate = 201;
const statusOK = 200;
const statusDel = 204;

router.post('/', userValidate.postValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const payload = {
    email,
    password,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  await Users.create({ displayName, email, password, image });

  res.status(statusCreate).send({ token });
});

router.get('/', userValidate.tokenValidation, async (req, res) => {
  const users = await Users.findAll();

  res.status(statusOK).json(users);
});

router.get('/:id', userValidate.userIdValidation, async (req, res) => {
  const { id } = req.params;

  const user = await Users.findByPk(id);

  res.status(statusOK).json(user);
});

router.delete('/me', userValidate.tokenValidation, async (req, res) => {
  /* const token = req.headers.authorization; */

  // procurar uma forma de usar o token para excluir...
  res.status(statusDel).end();
});

module.exports = router;
