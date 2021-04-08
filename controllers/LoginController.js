const { Router } = require('express');

const { validatedLogin, verifyEmailLogin } = require('../middlewares/validateUsers');
// const { createNewUser } = require('../services/UserServices');
const createToken = require('../services/tokenCreate');

const UserController = new Router();

UserController.post('/', validatedLogin, verifyEmailLogin, async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  const userToken = { email };
  const token = createToken(userToken);
  res.status(200).json({ token });
});

module.exports = UserController;
