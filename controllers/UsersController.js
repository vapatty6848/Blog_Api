const { Router } = require('express');

const route = Router();

const { UsersServices } = require('../services');
const { validations: valid } = require('../middlewares');

route.post('/', valid.verifyBodyData, async (req, res) => {
  const dataUser = req.body;
  const { email } = dataUser;
  try {
    await UsersServices.createUser(dataUser);
    const token = await UsersServices.createToken({ email });
    return res.status(201).json({ token });
  } catch {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
});

route.get('/', valid.verifyAuthorization, async (req, res) => {
  const listUsers = await UsersServices.findAllUsers();
  return res.status(200).json(listUsers);
});

module.exports = route;
