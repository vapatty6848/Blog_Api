const { Router } = require('express');

const { validatedLogin, verifyEmailLogin } = require('../middlewares/validateUsers');
const createToken = require('../services/tokenCreate');

const LoginController = new Router();

LoginController.post('/', validatedLogin, verifyEmailLogin, async (req, res) => {
  const { email } = req.body;
  const { id: userId } = req.user;
  const token = createToken({ email, userId });
  res.status(200).json({ token });
});

module.exports = LoginController;
