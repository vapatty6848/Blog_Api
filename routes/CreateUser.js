const { Router } = require('express');
const validateCreateUSer = require('../middlewares/validateCreateUser');
const CreateUserController = require('../controller/CreateUserController');

const CreateUserRouter = Router();

CreateUserRouter.post('/', validateCreateUSer, CreateUserController);

module.exports = CreateUserRouter;
