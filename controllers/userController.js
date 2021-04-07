const { Router } = require('express');
const router = Router();
const { Users } = require('../models');
const validations = require('../services/validations');
const { createToken } = require('../auth/token');

router.post('/user', validations.validate, async(req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await Users.create({ displayName, email, password, image });
  const token = createToken(user);
  return res.status(201).json({ token });
});

router.get('/', async (req, res) => {
  const users = await Users.findAll();
  return res.status(200).json(users);
});

module.exports = router;
