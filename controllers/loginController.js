const express = require('express');
const { validateUserLogin } = require('../middlewares/UserMiddleware');
const { tokenGenerator } = require('../utils/TokenUtils');

const router = express.Router();

router.post('/', validateUserLogin, async (req, res) => {
  const { user } = res.locals;
  const { password: pwd, ...UserWithoutPassword } = user;
  const token = tokenGenerator(UserWithoutPassword);
  res.locals.user.token = token;
  // usuario salvo em: res.locals.user;
  // console.log(res.locals);
  res.status(200).json({ token });
});

module.exports = router;
