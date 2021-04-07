const { Router } = require('express');
const { User } = require('../models');
const createToken = require('../auth/createToken');
const userValidations = require('../middlewares/userValidations');
const comebackResponse = require('../util/comebackResponse');
const messages = require('../util/returnedMessages');

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

UserController.get('/:id', userValidations.validateTokenLogin, async (req, res) => {
  const foundUser = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { id: req.params.id },
  });
  if (!foundUser) return comebackResponse(res, 404, messages.userNotFound);
  return res.send(foundUser);
});

UserController.delete('/me', userValidations.validateTokenLogin, async (req, res) => {
  const { validUser } = req;
  await User.destroy({ where: { id: validUser.id } });
  res.status(204).end();
});

module.exports = UserController;
