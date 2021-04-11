const { Router } = require('express');
const loginService = require('../service/loginService');

const controller = Router();

const SUCCESS = 200;

controller.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  const result = await loginService.userLogin({ email, password });

  if (result.payload) return next(result);
  return res.status(SUCCESS).json({ token: result });
});

module.exports = controller;
