const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const validateUserObj = require('../middlewares/validateUserObj');
const ensureAuth = require('../middlewares/ensureAuth');

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', ensureAuth, usersController.show);
usersRouter.get('/:id', ensureAuth, usersController.find);
usersRouter.post('/', validateUserObj, usersController.create);
usersRouter.delete('/me', ensureAuth, usersController.delete);

module.exports = usersRouter;
