const { Router } = require('express');
const validateCreateUSer = require('../middlewares/validateCreateUser');
const CreateUserController = require('../controller/CreateUserController');
const getUsersController = require('../controller/GetUserController');
const validateToken = require('../middlewares/GetUserValidate');

const UserRouter = Router();

UserRouter.post('/', validateCreateUSer, CreateUserController);
UserRouter.get('/', validateToken, getUsersController);

module.exports = UserRouter;
