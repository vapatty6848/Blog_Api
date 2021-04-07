const { Router } = require('express');

const userRouter = Router();

const { User } = require('../models');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyExistUser,
} = require('../service/validateUsers');
const createToken = require('../auth/createToken');

const CREATED = 201;

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, verifyExistUser,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    const token = createToken(newUser);
    return res.status(CREATED).json({ token });
  });

module.exports = userRouter;
