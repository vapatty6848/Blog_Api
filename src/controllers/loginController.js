const router = require('express').Router();

const { createToken } = require('../auth');
const { loginValidation } = require('../middlewares');

router.post(
  '/',
  loginValidation.verifyEmail,
  loginValidation.verifyPassword,
  loginValidation.verifyUserExists,
  async (req, res) => {
    const token = createToken(req.user);

    return res.status(200).json({ token });
  },
);

module.exports = router;
