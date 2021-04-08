const { Router } = require('express');
const { User } = require('../models');
const { OK, CREATED, CONFLICT } = require('../dictionary/statusCode');
const { USER_EXISTS } = require('../dictionary/errorMessage');
const Validation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');

const usersRouter = new Router();

usersRouter.get(
  '/',
  (_req, res) => {
    User.findAll()
      .then((users) => res.status(OK).json(users))
      .catch((err) => res.status(500).json({ message: err.message }));
  },
);

usersRouter.post(
  '/',
  Validation.displayName,
  Validation.password,
  Validation.email,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const isNewUser = (await User.findAll({ where: { email } })).length === 0;

    if (isNewUser) {
      const createdUser = await User.create({ displayName, email, password, image });
      const { id, email: userEmail, displayname: name } = createdUser.dataValues;
      const token = createToken({ id, email: userEmail, name });

      return res.status(CREATED).json({ token });
    }
    return res.status(CONFLICT).json(USER_EXISTS);
  },
);

module.exports = usersRouter;
