const { Router } = require('express');
const usersService = require('../services/usersService');
const createToken = require('../auth/createToken');
const validateUser = require('../middlewares/usersValidation');
const validateEmail = require('../middlewares/emailValidation');
const tokenIsValid = require('../middlewares/tokenValidation');

const router = Router();

const CREATE = 201;
const OK = 200;

router.get('/', tokenIsValid, async (_req, res) => {
  const foundUsers = await usersService.findAllUsers();

  res.status(OK).json(foundUsers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const foundUser = await usersService.findUserById(id);

  res.status(OK).json(foundUser);
});

router.post('/', validateUser, validateEmail, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await usersService.usersCreate({ displayName, email, password, image });

  const token = createToken(newUser.dataValues);
  res.status(CREATE).json({ token });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUsers(id);

  res.status(OK).end();
});

module.exports = router;
