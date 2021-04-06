const { Router } = require('express');
const { UsersServices } = require('../services');
const { ValidateUser } = require('../middlewares');

const Route = new Router();

Route.get('/', UsersServices.getAllUsers);
Route.post('/', ValidateUser.ExistOrNot, ValidateUser.FormatOfUserInfos, UsersServices.createNewUser);

module.exports = Route;