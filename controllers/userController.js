const { Router } = require('express');
const { User } = require('../models');
const { validateUser } = require('../services/userService');
const { createToken } = require('../services/authorization');

const userRouter = Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await User.create({ displayName, email, password, image });

  const token = await createToken(user);
  return res.status(201).json({ token });
});

module.exports = userRouter;
