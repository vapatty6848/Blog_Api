const { Router } = require('express');
const rescue = require('express-rescue');

const UserService = require('../service/UserService');
const { validateName, validateEmail, validatePassword, emailExists, unknownUser, userIdExist } = require('../middlewares/userValidations');
const createToken = require('../auth/createToken');
const { validateToken } = require('../auth/validateToken');

const UserController = Router();
const CREATED = 201;
const OK = 200;
const NO_CONTENT = 204;

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
    id: addedUser.dataValues.id,
    displayName,
    email,
    image,
  };
  console.log('dados usuario criação', userData);

  const token = createToken(userData);

  return res.status(CREATED).json({ token });
}));

UserController.post('/login', validateEmail, validatePassword, unknownUser, rescue(async (req, res) => {
  const { email, password } = req.body;
  const [{ dataValues }] = await UserService.findUserByEmailAndPassword(email, password);

  const { id, displayName, image } = dataValues;
  const user = {
    id,
    displayName,
    email,
    image,
  };
  console.log('dados usuario criação', user);
  const token = createToken(user);

  return res.status(OK).json({ token });
}));

UserController.get('/user', validateToken, rescue(async (req, res) => {
  const users = await UserService.findUsers();

  return res.status(OK).json(users);
}));

UserController.get('/user/:id', validateToken, userIdExist, rescue((async (req, res) => {
  const { id } = req.params;
  const user = await UserService.findById(id);

  return res.status(OK).json(user);
})));

UserController.delete('/user/me', validateToken, rescue((async (req, res) => {
  const { id } = req.user;

  UserService.deleteUser(id);
  return res.status(NO_CONTENT).json({});
})));

module.exports = UserController;
