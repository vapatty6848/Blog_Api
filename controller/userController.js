const { Router } = require('express');
const userService = require('../service/userService');

const controller = Router();

const SUCCESS = 200;
const SUCCESS1 = 201;
const DELETE_SUCCESS = 204;

controller.delete('/me', async (req, res, next) => {
  const { authorization: token } = req.headers;

  const result = await userService.deleteUser({ token });
  if (result.payload) return next(result);

  return res.status(DELETE_SUCCESS).send();
});

controller.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;

  const result = await userService.findById({ id, token });
  if (result.payload) return next(result);

  return res.status(SUCCESS).json(...result);
});

controller.get('/', async (req, res, next) => {
  const { authorization: token } = req.headers;
  const result = await userService.findAll(token);

  if (result.payload) return next(result);

  return res.status(SUCCESS).json(result);
});

controller.post('/', async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const result = await userService.createUser({ displayName, email, password, image });

  if (result.payload) return next(result);
  return res.status(SUCCESS1).json({ token: result });
});

module.exports = controller;
