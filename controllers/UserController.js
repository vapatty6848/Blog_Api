const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateName, validateEmail, validatePassword, emailRepeat } = require('../middlewares/userValidations');
const { User } = require('../models');
const { createToken } = require('../middlewares/auth');
const validateAuth = require('../middlewares/authValidate');

const UserController = Router();

UserController.post('/', validateName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await emailRepeat(email);
  if (user !== null) {
    return res.status(409)
      .json({ message: 'Usuário já existe' });
  }
  await User.create({ displayName, email, password, image });
  const token = createToken(displayName, email);
  return res.status(201).json({ token });
});

UserController.get('/', validateAuth, async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

UserController.get('/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user || user === '') {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
});

UserController.delete('/me', validateAuth, async (req, res) => {
  const { authorization } = req.headers;

  const payload = jwt.decode(authorization);

  await User.destroy({ where: { email: payload.email } });

  return res.status(204).json();
});

module.exports = UserController;
