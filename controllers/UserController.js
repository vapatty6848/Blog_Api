const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authenticationMiddleware = require('../auth/authenticationMiddleware');
const { shortName, shortPassword, emailMustBeValid, doesntExist,
  passwordRequired, emailAlreadyExists } = require('../services/messages');
const tokenCreator = require('../auth/tokenCreator');
const { CREATED, BAD_REQUEST, CONFLICT, SUCCESS,
  NOT_FOUND, NO_CONTENT } = require('../services/httpStatuses');
const { validatorLength, emailValidator } = require('../services/validator');

const UserController = Router();

UserController.get('/', authenticationMiddleware, async (_req, res) => {
  const users = await User.findAll();
  return res.status(SUCCESS).json(users);
});

UserController.delete('/me', authenticationMiddleware, async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = jwt.decode(token);
  await User.destroy({ where: { id } });
  return res.status(NO_CONTENT).send();
});

UserController.get('/:id', authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user === null) {
    return res.status(NOT_FOUND).json(doesntExist);
  }
  return res.status(SUCCESS).json(user);
});

UserController.post('/', async (req, res) => {
  const { displayName, email, image, password } = req.body;
  const requiredNameLength = [{ name: 'displayName', requiredLength: 8 }];
  const requiredPasswordLength = [{ name: 'password', requiredLength: 6 }];
  if (!email) { return res.status(BAD_REQUEST).json({ message: '"email" is required' }); }
  if (!password) { return res.status(BAD_REQUEST).json(passwordRequired); }
  const isEmailRegistered = await User.findOne({ where: { email } });
  const isPasswordValid = validatorLength({ password }, requiredPasswordLength);
  const isNameValid = validatorLength({ displayName }, requiredNameLength);
  const isEmailValid = emailValidator(email);
  if (isEmailRegistered !== null) { return res.status(CONFLICT).json(emailAlreadyExists); }
  if (!isEmailValid) { return res.status(BAD_REQUEST).json(emailMustBeValid); }
  if (!isNameValid) { return res.status(BAD_REQUEST).json(shortName); }
  if (!isPasswordValid) { return res.status(BAD_REQUEST).json(shortPassword); }
  if (isPasswordValid && isNameValid && isEmailValid) {
    await User.create({ displayName, email, password, image });
    const token = tokenCreator({ displayName, email, image, password });
    return res.status(CREATED).json({ token });
  }
});

module.exports = UserController;
