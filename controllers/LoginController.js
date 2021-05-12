const { Router } = require('express');

const UserService = require('../services/userService');
const { validateLogin } = require('../middlewares/validateUseData');
const { createToken } = require('../auth/token');

const router = new Router();

router.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;

  const user = await UserService.getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = createToken(email);

  return res.status(200).json({ token });
});

module.exports = router;
