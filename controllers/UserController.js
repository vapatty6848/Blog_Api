const UserController = require('express').Router();
const { regValidationRules, validateReg } = require('../middlewares/validateUserReg');
const UserServices = require('../services/UserServices');

UserController.get('/', async (req, res) => {
  const { status, message } = await UserServices.findAllUsers();

  res.status(status).json(message);
});

UserController.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { status, message, user } = await UserServices.findUser(id);

  return (!user) ? res.status(status).json({ message }) : res.status(status).json(user);
});

UserController.post('/', regValidationRules(), validateReg, async (req, res) => {
  const userInfo = req.body;

  const { status, message, token } = await UserServices.registerUser(userInfo);

  return (!message) ? res.status(status).json({ token }) : res.status(status).json({ message });
});

module.exports = UserController;
