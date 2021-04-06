const { Router } = require('express');

const { Users } = require('../models');

const router = Router();

const createToken = require('../auth/createToken');
const checkUser = require('../middleware/checkUser');
const checkAuthorization = require('../middleware/checkAuthorization');

router.post('/', checkUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };
  const token = await createToken(payload);
  await Users.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

router.get('/', checkAuthorization, async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json(users);
});

module.exports = router;
