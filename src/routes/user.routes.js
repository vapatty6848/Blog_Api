const { Router } = require('express');

const UserController = require('../controllers/UserController');

const validateUserData = require('../middlewares/validateUserData');
const ensureAuth = require('../middlewares/ensureAuth');

const userController = new UserController();

const userRoutes = Router();

userRoutes.get('/', ensureAuth, userController.show);
userRoutes.get('/:id', ensureAuth, userController.find);

userRoutes.post('/', validateUserData, userController.create);

userRoutes.delete('/me', ensureAuth, userController.deleteSelf);

module.exports = userRoutes;
