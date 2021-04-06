const { Router } = require('express');
const { UsersController } = require('../controllers');
const { validateUserCreation } = require('../middlewares/validations');

const UsersRouter = new Router();

UsersRouter.post('/', validateUserCreation, UsersController.createUser);

UsersRouter.get('/:id', UsersController.getUserById);

UsersRouter.get('/', UsersController.getAllUsers);

UsersRouter.delete('/me', UsersController.deleteUser);

module.exports = UsersRouter;
