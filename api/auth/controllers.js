const express = require('express');
const services = require('./services');
// const { middleware } = require('bodymen');
// const schema = require('../../schemas/user-schema');

const authController = express();
// const bodyCheck = middleware;
// const { email, password } = schema;

const errorTypes = [
  {
    status: 400,
    message: '"email" is required',
  },
  {
    status: 400,
    message: '"email" is not allowed to be empty',
  },
  {
    status: 400,
    message: '"password" is required',
  },
  {
    status: 400,
    message: '"password" is not allowed to be empty',
  },
];

const bodyCheck = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') return res.status(errorTypes[1].status).json({ message: errorTypes[1].message });
  if (!email) return res.status(errorTypes[0].status).json({ message: errorTypes[0].message });
  if (password === '') return res.status(errorTypes[3].status).json({ message: errorTypes[3].message });
  if (!password) return res.status(errorTypes[2].status).json({ message: errorTypes[2].message });
  next();
};

const login = async (req, res) => {
  const response = await services.login(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

authController.post('/',
  bodyCheck,
  login);

module.exports = authController;
