const express = require('express');

const { User } = require('../models');
const user = require('../Service/UserValidations');
const tk = require('../Service/TokenCreate');

const userRouter = express.Router();

userRouter.get('/', tk.allUsersverification, async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

userRouter.post('/', user.nameVerification, user.passwordVerification, user.emailVerification, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const token = tk.createToken({ displayName, email, image });
  res.status(201).json({ token });
});

module.exports = userRouter;
