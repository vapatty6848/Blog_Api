const { Router } = require('express');
const validateCreateUSer = require('../middlewares/validateCreateUser');
const CreateUserController = require('../controller/CreateUserController');
const getUsersController = require('../controller/GetUserController');
const verifyToken = require('../middlewares/VerifyToken');
const getUserByIdController = require('../controller/GetUserByIdController');
const getUserByIdValidation = require('../middlewares/GetUserByIdValidate');
// const validateToken = require('../middlewares/GetUserValidate');
const UserRouter = Router();

UserRouter.post('/', validateCreateUSer, CreateUserController);
UserRouter.get('/', verifyToken, getUsersController);
UserRouter.get('/:id', verifyToken, getUserByIdValidation, getUserByIdController);

module.exports = UserRouter;
