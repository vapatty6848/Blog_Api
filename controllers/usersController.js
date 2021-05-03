const { Router } = require('express');
const usersService = require('../services/usersService');
const createToken = require('../auth/createToken');
const validateUser = require('../middlewares/usersValidation');
const validateEmail = require('../middlewares/emailValidation');
const tokenIsValid = require('../middlewares/tokenValidation');

const router = Router();

const CREATE = 201;
const OK = 200;
const NO_CONTENT = 204;

router.get('/', tokenIsValid, async (_req, res) => {
  const foundUsers = await usersService.findAllUsers();

  return res.status(OK).json(foundUsers);
});

router.get('/:id', tokenIsValid, async (req, res) => {
  const { id } = req.params;

  const foundUser = await usersService.findUserById(id);
  if (foundUser.isError) {
    return res.status(foundUser.status).json({ message: foundUser.message });
  }

  return res.status(OK).json(foundUser);
});

router.post('/', validateUser, validateEmail, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const newUser = await usersService.usersCreate({ displayName, email, password, image });

    const token = createToken(newUser.dataValues);
    return res.status(CREATE).json({ token });
  } catch (error) {
    console.log('ERRO', error.message);
    return res.status(400).end();
  }
});

router.delete('/me', tokenIsValid, async (req, res) => {
  const { email } = req.user;
  await usersService.deleteUsers(email);

  return res.status(NO_CONTENT).end();
});

module.exports = router;
