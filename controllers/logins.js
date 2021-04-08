const { Router } = require('express');
const JWT = require('jsonwebtoken');
const { User } = require('../models');
const { loginValidation } = require('../services/serviceValidations');

const loginsRouter = Router();

const jwtParams = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

loginsRouter.post('/', loginValidation, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || password !== user.password) res.status(400).json({ message: 'Campos inválidos' });
  const token = JWT.sign({ signInData: [email, password] }, 'secret', jwtParams);
  return res.status(200).json({ token });
});

module.exports = loginsRouter;
