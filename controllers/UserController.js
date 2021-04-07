const { Router } = require('express');
const { User } = require('../models');
const createToken = require('../auth/createToken');
const userValidations = require('../middlewares/userValidations');

const UserController = Router();

UserController.post('/',
  userValidations.validateName,
  userValidations.validatePassword,
  userValidations.validateEmail,
  async (req, res) => {
    const { displayName, email, password: pass, image } = req.body;
    const { password, ...userWithoutPassword } = await User
      .create({ displayName, email, password: pass, image });
    const token = createToken(userWithoutPassword);
    res.status(201).json({ token });
  });

UserController.get('/', userValidations.validateTokenLogin, async (_req, res) => res
  .send(await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })));

module.exports = UserController;
