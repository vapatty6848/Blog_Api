const { Router } = require('express');

const route = Router();

const { UsersServices } = require('../services');
const { createTokenUser, validations: valid } = require('../middlewares');

route.post('/', valid.verifyBodyLogin, async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await UsersServices.findUserByEmail(email);
  if (findUser && findUser.password === password) next();
  else return res.status(400).json({ message: 'Campos inválidos' });
}, createTokenUser.createTokenLogin);

module.exports = route;
