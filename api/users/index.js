const { middleware } = require('bodymen');
const express = require('express');
const { create } = require('./controllers');
const schema = require('./schema');

const usersController = express();
const bodyCheck = middleware;
const { displayName, email, password, image } = schema;

usersController.post('/',
  bodyCheck({ displayName, email, image, password }),
  create);

module.exports = usersController;
