const { Router } = require('express');

const { User } = require('../models');
const { validateLogin } = require('../middlewares/validateUserData');
const { createToken } = require('../auth/token');

const LoginController = new Router();

LoginController.post('/', validateLogin, async (request, response) => {
  const { email } = request.body;
  const token = createToken(email);

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return response.status(400).json({ message: 'Campos inválidos' });
  }

  return response.status(200).json({ token });
});

module.exports = LoginController;
