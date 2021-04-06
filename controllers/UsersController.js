const { Router } = require('express');

const UsersController = Router();

const { User } = require('../models');
const createToken = require('../auth/createToken');
const { validateDisplayName, validateEmail, validatePassword } = require('../middlewares/userValidation');
const { validateToken } = require('../middlewares/tokenValidation');

UsersController.get('/', validateToken, async (_req, res) => {
  const allUsers = await User.scope('withoutPassword').findAll();

  res.status(200).json(allUsers);
});

UsersController.post('/', validateDisplayName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const generatedToken = createToken({ displayName, email, image });

  res.status(201).json({ token: generatedToken });
});

module.exports = UsersController;
