const { Router } = require('express');

const route = Router();

const { UsersServices } = require('../services');
const { createTokenUser, validations: valid } = require('../middlewares');

route.post('/', valid.verifyBodyData, async (req, res, next) => {
  const dataUser = req.body;
  try {
    await UsersServices.createUser(dataUser);
    next();
  } catch {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
}, createTokenUser.create);

module.exports = route;
