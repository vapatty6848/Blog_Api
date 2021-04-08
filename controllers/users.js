const { Router } = require('express');
const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { validateSignUp, validadeToken } = require('../services/serviceValidations');

const userRouter = Router();
const jwtParams = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

userRouter.get('/', validadeToken, async (req, res) => {
  const getAllUsers = await User.findAll({});
  return res.status(200).json(getAllUsers);
});
userRouter.get('/:id', validadeToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
});

userRouter.post('/', validateSignUp, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'Usuário já existe' });
  await User.create({ displayName, email, password, image });
  const token = JWT.sign({ signUpData: [displayName, email, password, image] }, 'secret', jwtParams);
  return res.status(201).json({ token });
});
// teste
module.exports = userRouter;
