const express = require('express');

const { validateEmail, validatePassword } = require('../validations/loginValidations');
const loginService = require('./loginService');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, (async (req, res) => {
  console.log('LOGIN CONTROLLER');
  const { email, password } = req.body;

  const { message, token } = await loginService.login(email, password);

  if (message) return res.status(400).json({ message });

  return res.status(200).json({ token });
}));

module.exports = loginRouter;
