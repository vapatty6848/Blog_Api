const { Router } = require('express');
const rescue = require('express-rescue');

const UserService = require('../service/UserService');
const { validateName, validateEmail, validatePassword, emailExists } = require('../middlewares/userValidations');
const createToken = require('../auth/createToken');

const UserController = Router();
const CREATED = 201;
const OK = 200;

UserController.post('/user', validateName, validateEmail, validatePassword, emailExists, rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = {
    displayName,
    email,
    password,
    image,
  };
  const addedUser = await UserService.addUser(newUser);

  const userData = {
    id: addedUser.id,
    displayName,
    email,
    password,
  };
  const token = createToken(userData);

  return res.status(CREATED).json({ token });
}));

UserController.get('/user', rescue(async (req, res) => {
  const users = await UserService.findUsers();

  return res.status(OK).json(users);
}));

module.exports = UserController;
