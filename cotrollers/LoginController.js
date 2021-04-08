const { Router } = require('express');
const { LoginValidate } = require('../middlewares/LoginValidate');
const { createToken } = require('../auth');

const models = require('../models');

const RouterLogin = Router();
const Success = 200;
const InvalidRequest = 400;

RouterLogin.post('/', LoginValidate, async (req, res) => {
  const { email, password } = req.body;
  const userExists = await models.User.findOne({ where: { email } });
  if (!userExists) return res.status(InvalidRequest).json({ message: 'Campos inválidos' });
  if (password !== userExists.dataValues.password) return res.status(InvalidRequest).json({ message: 'Campos inválidos' });
  // console.log(userExists);

  const token = await createToken(userExists);
  // console.log(token, 'token');

  return res.status(Success).json({ token });
});

module.exports = RouterLogin;
