const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('../validations/validateLogin');
const { User } = require('../models');

const loginRouter = Router();

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

loginRouter.post('/', validateLogin, async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ where: { email } });
  if (!user || password !== user.dataValues.password) {
    return response.status(400).json({ message: 'Campos inválidos' });
  }
  const token = jwt.sign({ data: user }, 'Chapolin', jwtConfig);
  return response.status(200).json({ token });
});

module.exports = loginRouter;
