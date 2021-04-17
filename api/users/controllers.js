const { middleware } = require('bodymen');
const express = require('express');
const services = require('./services');
const schema = require('../../schemas/user-schema');
const checkToken = require('../middlewares/checkToken');

const usersController = express();
const bodyCheck = middleware;
const { displayName, email, password, image } = schema;

const create = async (req, res) => {
  const response = await services.create(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const getAll = async (req, res) => {
  const response = await services.getAll();
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const getOne = async (req, res) => {
  const response = await services.getOne(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const remove = async (req, res) => {
  const response = await services.remove(req);
  const { status } = response;
  return res.status(status).send();
};

usersController.post('/',
  bodyCheck({ displayName, email, image, password }),
  create);

usersController.get('/:id',
  checkToken,
  getOne);

usersController.get('/',
  checkToken,
  getAll);

usersController.delete('/me',
  checkToken,
  remove);

module.exports = usersController;
