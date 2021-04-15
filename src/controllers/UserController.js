const Router = require('express');
const AppError = require('../error/AppError');
const validateAuth = require('../middlewares/validations/validateAuth');
const validateUsers = require('../middlewares/validations/validateUsers');
const UserService = require('../services/UserServices');
const generateToken = require('../utils/generateToken');

const userController = Router();

userController.post('/', validateUsers, async (req, res, next) => {
  console.log(req.body);
  const { email, displayName, password, image } = req.body;
  console.log('user controller');
  try {
    const user = await UserService.getUserByEmail(email);
    console.log(user, '----user');
    if (user) return next(AppError('Usuário já existe', 409));
    console.log(displayName, 'dn', 'password', password, image);
    const userCreatedData = await UserService.createUser({ email, displayName, password, image });
    const { password: noLook, ...NotSensitiveData } = userCreatedData.dataValues;
    console.log(NotSensitiveData, 'user created no sensitive data');
    const token = generateToken(NotSensitiveData);
    res.status(201).json({ message: 'created', user: NotSensitiveData, token });
  } catch (Err) {
    next(Err);
  }
});

userController.get('/:id', validateAuth, async (req, res, next) => {
  const { id: paramsId } = req.params;
  try {
    const user = await UserService.getUserById(paramsId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userController.get('/', validateAuth, async (req, res, next) => {
  const { id } = res.locals.user;
  try {
    const users = await UserService.getAllUsers(id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = { userController };
