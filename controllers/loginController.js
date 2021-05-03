const { Router } = require('express');
const usersService = require('../services/usersService');
const validateLogin = require('../middlewares/loginValidation');
const createToken = require('../auth/createToken');

const router = Router();

const OK = 200;

router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const login = await usersService.findUserByEmailAndPassword(email, password);
  if (login.isError) {
    return res.status(login.status).json({ message: login.message });
  }

  const { id, displayName } = login;

  const payload = {
    id,
    email,
    displayName,
  };

  const token = createToken(payload);

  return res.status(OK).json({ token });
});

module.exports = router;
