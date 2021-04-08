const { Router } = require('express');
const { User } = require('../models');
const validateUser = require('../Middlewares/validateUser');

const routerUser = Router();

routerUser.get('/', async (_req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    });
});

routerUser.get('/:id', async (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    });
});

routerUser.post('/', validateUser, async (req, res) => {
  console.log(req.body);
  const { displayName, email, password, image } = req.body;
  const newUser = { displayName, email, password, image };
  User.create(newUser)
    .then((user) => {
      res.status(201).json(user);
    });
});

module.exports = routerUser;
