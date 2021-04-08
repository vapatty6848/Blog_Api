const { Router } = require('express');
const { User } = require('../models');
const validateUser = require('../Middlewares/validateUser');
const createToken = require('../auth/createToken');

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
  const { displayName, email, password, image } = req.body;
  const newUser = { displayName, email, password, image };
  User.create(newUser);
  const token = createToken(newUser);

  res.status(201).json({ token });
});

module.exports = routerUser;
