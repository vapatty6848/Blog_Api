const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const validateSessionObj = require('../middlewares/validateSessionObj');

const sessionRouter = Router();

const usersController = new UsersController();

sessionRouter.post('/', validateSessionObj, usersController.createSession);

module.exports = sessionRouter;
