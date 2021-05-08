const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { createToken } = require('../middlewares/tokenJWT');
const {
  validateLogin,
} = require('../middlewares/validations');

const { verifyLogin } = require('../middlewares/verifyEmail');

const { User } = require('../models');

const router = express.Router();

router.post('/', validateLogin, verifyLogin, async (req, res) => {
  const { body } = req;

  await User.findOne({
    where: body,
  }).then((login) => {
    console.log('login aqui:', login);
    const token = createToken(login);
    return res.status(StatusCodes.OK).json({ token });
  }).catch(() => res.status(StatusCodes.BAD_REQUEST).json({ message: 'Campos inválidos' }));
});

module.exports = router;
