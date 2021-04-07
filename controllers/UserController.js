const express = require('express');

const { User } = require('../models');
const userService = require('../Service/UserValidations');

const userRouter = express.Router();

// userRouter.get('/', (req, res, _next) => {
//   User.findAll().then((users) => {
//     res.status(200).json(users);
//   }).catch((err) => {
//     console.error(err.message);
//     res.status(401).json({ message: 'deu ruim' });
//   });
// });

userRouter.post('/', userService.nameVerification, userService.passwordVerification, userService.emailVerification, userService.createToken, async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const { token } = req;
  res.status(201).json({ token });
});

module.exports = userRouter;
