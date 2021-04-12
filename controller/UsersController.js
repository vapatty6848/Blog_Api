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

const statusCreate = 201;
const statusOK = 200;
const statusDel = 204;

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await userValidate.postValidation();

  const payload = {
    email,
    password,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  await Users.create({ displayName, email, password, image });

  res.status(statusCreate).send({ token });
});

router.get('/', async (req, res) => {
  await userValidate.tokenValidation();

  const users = await Users.findAll();

  res.status(statusOK).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  await userValidate.tokenValidation();
  await userValidate.userIdValidation();

  const user = await Users.findByPk(id);

  res.status(statusOK).json(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await userValidate.tokenValidation();

  await Users.destroy({ where: id });

  res.status(statusDel).end();
});

module.exports = router;
