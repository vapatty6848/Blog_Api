const { Router } = require('express');
const { UsersController } = require('../controllers');
const { validateUserCreation, validateToken } = require('../middlewares/validations');

const UsersRouter = new Router();

UsersRouter.post('/', validateUserCreation, UsersController.createUser);

UsersRouter.get('/:id', validateToken, UsersController.getUserById);

UsersRouter.get('/', validateToken, UsersController.getAllUsers);

UsersRouter.delete('/me', validateToken, UsersController.deleteUser);

module.exports = UsersRouter;
