const express = require('express');

const { User } = require('../models');

const loginRouter = express.Router();

const UNPROCESS = 400;

// middleware
const verifyEmailLoginController = require('../middlewares/verifyEmailLoginController');

// auth
const createToken = require('../auth/createToken');

loginRouter.post('/', verifyEmailLoginController, async (req, res) => {
  const { email, password } = req.body;

  const device = await User.findOne({
    where: {
      email,
    },
  });

  if (password === undefined) return res.status(UNPROCESS).json({ message: '"password" is required' });
  if (password.length === 0) return res.status(UNPROCESS).json({ message: '"password" is not allowed to be empty' });

  if (!device) return res.status(UNPROCESS).json({ message: 'Campos inválidos' });
  if (device.dataValues.password !== password) res.status(UNPROCESS).json({ message: 'Campos inválidos' });

  const {
    password: passwordDB, ...userWithoutPassword
  } = device.dataValues;
  const token = createToken(userWithoutPassword);

  return res.status(200).json({ token });
});

module.exports = loginRouter;
