const { Router } = require('express');
const FindAllUsersServices = require('../services/FindAllUsersService');
const CreateUserService = require('../services/CreateUserService');
const UserValidation = require('../middlewares/UserValidation');
const EmailChecker = require('../middlewares/EmailChecker');
const CreateToken = require('../auth/CreateToken');

const UsersController = Router();

UsersController.get('/', async (_req, res) => {
  try {
    const users = await FindAllUsersServices();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.messsage);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

UsersController.post('/', UserValidation, EmailChecker, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await CreateUserService({ displayName, email, password, image });
    const { password: passWord, ...userWithoutPassword } = user;
    return res.status(201).json({ token: CreateToken(userWithoutPassword) });
  } catch (e) {
    console.log(e.messsage);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = UsersController;
