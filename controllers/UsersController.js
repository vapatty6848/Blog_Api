const { Router } = require('express');
const jwt = require('jsonwebtoken');
const FindAllUsersService = require('../services/FindAllUsersService');
const FindUserService = require('../services/FindUserService');
const CreateUserService = require('../services/CreateUserService');
const UserValidation = require('../middlewares/UserValidation');
const EmailChecker = require('../middlewares/EmailChecker');
const CreateToken = require('../auth/CreateToken');
const TokenValidation = require('../middlewares/TokenValidation');
const DeleteUserService = require('../services/DeleteUserService');

const UsersController = Router();

UsersController.get('/', TokenValidation, async (_req, res) => {
  try {
    const users = await FindAllUsersService();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.messsage);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

UsersController.get('/:id', TokenValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, email, image } = await FindUserService(id);
    return res.status(200).json({ id, displayName, email, image });
  } catch (e) {
    console.log(e.messsage);
    return res.status(404).json({ message: 'Usuário não existe' });
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

UsersController.delete('/me', TokenValidation, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const payload = jwt.decode(authorization);
    const { id } = payload;
    await DeleteUserService(id);
    return res.status(204);
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = UsersController;
