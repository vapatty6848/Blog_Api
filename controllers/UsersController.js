const { Router } = require('express');

const route = Router();

const { UsersServices, ValidationDataServices } = require('../services');
const { validations: valid } = require('../middlewares');

route.post('/', valid.verifyBodyData, async (req, res) => {
  const dataUser = req.body;
  const { email } = dataUser;
  try {
    const { id } = await UsersServices.createUser(dataUser);
    const token = await ValidationDataServices.createToken({ email, id });
    return res.status(201).json({ token });
  } catch {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
});

route.get('/', valid.verifyAuthorization, async (_req, res) => {
  const listUsers = await UsersServices.findAllUsers();
  return res.status(200).json(listUsers);
});

route.get('/:id', valid.verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const user = await UsersServices.findUsersById(id);
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: 'Usuário não existe' });
});

route.delete('/me', valid.verifyAuthorization, async (req, res) => {
  const { authorization: token } = req.headers;
  const { email } = await ValidationDataServices.tokenValid(token);
  const deleteUser = await UsersServices.deleteUser({ where: { email } });
  if (deleteUser !== 0) return res.status(204).send();
  res.status(500).json({ message: 'Usuário não existe na base de dados' });
});

module.exports = route;
