const { Router } = require('express');
const { userPostValidation } = require('../services/ValidateData');

const UserController = new Router();

UserController.post('/', async (req, _res) => {
  const userData = req.body;
  return userPostValidation(userData);
});

module.exports = UserController;
