const { Router } = require('express');
const { User } = require('../models');

const routerUser = Router();

routerUser.get('/', async (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    });
});

routerUser.post('/', async (req, res) => {
  const { body } = req;
  const createUser = await User.create(body);

  res.send(201).json(createUser);

  return createUser;
});

module.exports = routerUser;
