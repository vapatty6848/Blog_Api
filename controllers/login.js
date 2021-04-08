const { Router } = require('express');
const { User } = require('../models');
const { OK, BAD_REQUEST } = require('../dictionary/statusCode');
const { USER_NOT_FOUND } = require('../dictionary/errorMessage');
const Validation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');

const loginRouter = new Router();

loginRouter.post(
  '/',
  Validation.requiredInfo,
  Validation.emptyRequiredInfo,
  async (req, res) => {
    const { email, password } = req.body;
    const userRegistered = await User.findAll({ where: { email, password } });
    const userNotExists = !userRegistered.length;

    if (userNotExists) return res.status(BAD_REQUEST).json(USER_NOT_FOUND);

    const token = createToken({
      id: userRegistered[0].id,
      email,
      name: userRegistered[0].displayName,
    });

    return res.status(OK).json({ token });
  },
);

module.exports = loginRouter;
