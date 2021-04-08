const { Router } = require('express');

const { validatedUsers, verifyEmailUser } = require('../middlewares/validateUsers');
const { createNewUser } = require('../services/UserServices');
const createToken = require('../services/tokenCreate');

const UserController = new Router();

UserController.post('/', validatedUsers, verifyEmailUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await createNewUser(displayName, email, password, image);
  const userToken = { displayName, email };
  const token = createToken(userToken);
  res.status(201).json({ token });
});

module.exports = UserController;
