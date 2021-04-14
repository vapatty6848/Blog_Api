const { Router } = require('express');

const controller = require('../controllers');
const middleware = require('../middlewares');

const userRoute = Router();

userRoute.post('/', middleware.validateUser, controller.users.create);

userRoute.get('/', middleware.validateToken, controller.users.getAll);

userRoute.get('/:id', middleware.validateToken, controller.users.getById);

userRoute.delete('/me', middleware.validateToken, controller.users.remove);

module.exports = userRoute;
