const express = require('express');
const { User } = require('../models');
const { validateUserLogin } = require('../middlewares/UserMiddleware');
const tokenGenerator = require('../utils/TokenGenerator');

const router = express.Router();

router.post('/', validateUserLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const { password: pwd, ...UserWithoutPassword } = user;
    const token = tokenGenerator(UserWithoutPassword);
    res.locals.user = token;
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
