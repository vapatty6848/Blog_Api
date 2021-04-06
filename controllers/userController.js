const { Router } = require('express');

const { Users } = require('../models');

const router = Router();

const createToken = require('../auth/createToken');
const checkUser = require('../middleware/checkUser');

router.post('/', checkUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };
  const token = await createToken(payload);
  await Users.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

module.exports = router;
