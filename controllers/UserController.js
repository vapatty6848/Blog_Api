const { Router } = require('express');
const { User } = require('../models');
const createToken = require('../auth/createToken');

const UserController = Router();

UserController.post('/', async (req, res) => {
  const { displayName, email, password: pass, image } = req.body;
  const { password, ...userWithoutPassword } = await User.create({ displayName, email, password: pass, image });
  const token = createToken(userWithoutPassword);
  res.status(201).json({ token });
});

module.exports = UserController;
