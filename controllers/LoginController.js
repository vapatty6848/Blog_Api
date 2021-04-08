const { Router } = require('express');
const { UsersServices, ValidationDataServices } = require('../services');
const { validations: valid } = require('../middlewares');

const route = Router();
const ok = 200;
const badRequest = 400;

route.post('/', valid.verifyBodyLogin, async (req, res) => {
  const { email, password } = req.body;
  const findUser = await UsersServices.findUserByEmail(email);
  if (findUser && findUser.password === password) {
    const { id } = findUser;
    const token = await ValidationDataServices.createToken({ email, id });
    return res.status(ok).json({ token });
  }
  return res.status(badRequest).json({ message: 'Campos inválidos' });
});

module.exports = route;
