const { Router } = require('express');
const { User } = require('../models');
const { validateUser } = require('../services/userService');
const { createToken, validateToken } = require('../services/authorization');

const userRouter = Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  try {
    const user = await User.create({ displayName, email, password, image });
    const token = createToken(user);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

userRouter.get('/', validateToken, async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json(users);
});

userRouter.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const users = await User.findOne({ where: { id } });

  if (!users) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(users);
});

module.exports = userRouter;
