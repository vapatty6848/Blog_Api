const express = require('express');

const { User } = require('../models');
const userServ = require('../Service/UserValidations');
const tk = require('../Service/TokenCreate');

const userRouter = express.Router();

userRouter.get('/:id', tk.allUsersverification, userServ.userByIdVerification, async (req, res) => {
  const [user] = req.user;
  res.status(200).json(user);
});

userRouter.get('/', tk.allUsersverification, userServ.findAll, async (req, res) => {
  res.status(200).json(req.users);
});

userRouter.post('/', userServ.nameVerification, userServ.passwordVerification, userServ.emailVerification, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const token = tk.createToken({ displayName, email, image });
  res.status(201).json({ token });
});

userRouter.delete('/me', async (req, res) => {
  const [user] = req.user;
  res.status(200).json(user);
});

module.exports = userRouter;
