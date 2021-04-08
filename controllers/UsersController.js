const { Router } = require('express');
const FindAllUsersServices = require('../services/FindAllUsersService');

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

module.exports = UsersController;
