const { Router } = require('express');
const {
  CreateUserController,
  getUsersController,
  getUserByIdController,
  deleteMyUserController,
} = require('../controller/user');

const validateCreateUSer = require('../middlewares/validateCreateUser');
const verifyToken = require('../middlewares/VerifyToken');
const getUserByIdValidation = require('../middlewares/GetUserByIdValidate');
// const CreateUserController = require('../controller/user/CreateUserController');
// const getUsersController = require('../controller/user/GetUserController');
// const getUserByIdController = require('../controller/user/GetUserByIdController');
// const deleteMyUserController = require('../controller/user/DeleteMyUserController');

const UserRouter = Router();

UserRouter.post('/', validateCreateUSer, CreateUserController);
UserRouter.get('/', verifyToken, getUsersController);
UserRouter.get('/:id', verifyToken, getUserByIdValidation, getUserByIdController);
UserRouter.delete('/me', verifyToken, deleteMyUserController);

module.exports = UserRouter;
