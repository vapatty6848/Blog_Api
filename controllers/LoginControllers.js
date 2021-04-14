const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../auth/createToken');

const routes = Router();

const badRequest = 400;

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (typeof (email) !== 'string') {
    return res.status(badRequest).json({ message: '"email" is required' });
  }

  if (email.length < 1) {
    return res.status(badRequest).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (typeof (password) !== 'string') {
    return res.status(badRequest).json({ message: '"password" is required' });
  }

  if (password.length < 1) {
    return res.status(badRequest).json({ message: '"password" is not allowed to be empty' });
  }

  next();
};

routes.post('/', checkEmail, checkPassword, async (req, res) => {
  const { email, password } = req.body;

  const userAlreadyExists = await Users.findOne({ where: { email, password } });

  if (!userAlreadyExists) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = createToken({ email, password });

  return res.status(200).json({ token });
});

module.exports = { routes };
