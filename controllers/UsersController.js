const { Router } = require('express');
const { UsersServices } = require('../services');
const { ValidateUser } = require('../middlewares');
const validateToken = require('../auth/validateToken');

const Route = new Router();

Route.get('/', validateToken, UsersServices.getAllUsers);
Route.get('/:id', validateToken, ValidateUser.UserExistsByID, UsersServices.getUserById);
Route.post('/', ValidateUser.FormatOfUserInfos, ValidateUser.ExistOrNot, UsersServices.createNewUser);
Route.delete('/me', validateToken, UsersServices.destroyUser);

module.exports = Route;
