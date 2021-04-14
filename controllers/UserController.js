const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validateName, validateEmail, validatePassword } = require('../middlewares/userValidations');
const { User } = require('../models');
const { jwtHeaders, jwtSecret } = require('../middlewares/auth');

const UserController = Router();

UserController.get('/', async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

UserController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return res.status(200).json(user);
});

UserController.post('/', validateName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await User.create({ displayName, email, password, image });
  const dataPayload = { displayName, email };
  const token = jwt.sign(dataPayload, jwtSecret, jwtHeaders);
  return res.status(201).json({ token });
});

module.exports = UserController;
