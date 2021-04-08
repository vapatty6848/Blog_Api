const { Router } = require('express');

const route = Router();

const { UsersServices, ValidationDataServices } = require('../services');
const { validations: valid } = require('../middlewares');

route.post('/', valid.verifyBodyLogin, async (req, res) => {
  const { email, password } = req.body;
  const findUser = await UsersServices.findUserByEmail(email);
  if (findUser && findUser.password === password) {
    const { id } = findUser;
    const token = await ValidationDataServices.createToken({ email, id });
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'Campos inválidos' });
});

module.exports = route;
