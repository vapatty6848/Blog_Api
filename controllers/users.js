const { Router } = require('express');
const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { validateSignUp } = require('../services/serviceValidations');

const userRouter = Router();
const jwtParams = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
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
