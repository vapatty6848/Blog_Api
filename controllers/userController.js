const { Router } = require('express');

const { User } = require('../models');

const router = Router();

const createToken = require('../auth/createToken');
const checkUser = require('../middleware/checkUser');

router.post('/', checkUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };
  const token = await createToken(payload);
  await User.create({ displayName, email, password, image });
  res.status(201).json(token);
});
