const { Router } = require('express');
const { UsersServices, ValidationDataServices } = require('../services');
const { validations: valid } = require('../middlewares');

const route = Router();
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;
const conflict = 409;

route.post('/', valid.verifyBodyData, async (req, res) => {
  const dataUser = req.body;
  const { email } = dataUser;
  try {
    const { id } = await UsersServices.createUser(dataUser);
    const token = await ValidationDataServices.createToken({ email, id });
    return res.status(created).json({ token });
  } catch {
    return res.status(conflict).json({ message: 'Usuário já existe' });
  }
});

route.get('/', valid.verifyAuthorization, async (_req, res) => {
  const listUsers = await UsersServices.findAllUsers();
  return res.status(ok).json(listUsers);
});

route.get('/:id', valid.verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const user = await UsersServices.findUsersById(id);
  if (user) return res.status(ok).json(user);
  return res.status(notFound).json({ message: 'Usuário não existe' });
});

route.delete('/me', valid.verifyAuthorization, async (req, res) => {
  const { authorization: token } = req.headers;
  try {
    const { email } = await ValidationDataServices.tokenValid(token);
    const deleteUser = await UsersServices.deleteUser(email);
    if (deleteUser !== 0) return res.status(noContent).send();
  } catch {
    const message = 'Usuário não existe na base de dados';
    return res.status(500).json({ message });
  }
});

module.exports = route;
