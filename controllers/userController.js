const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { createToken, verifyToken } = require('../middlewares/tokenJWT');
const {
  validateUser,
} = require('../middlewares/validations');

const { verify } = require('../middlewares/verifyEmail');

const { User } = require('../models');

const router = express.Router();

router.post('/', validateUser, verify, async (req, res) => {
  const { body } = req;
  // const verifyemail = await User.findOne({ where: { email: body.email } });
  // if (verifyemail) {
  //   return res.status(StatusCodes.CONFLICT).json({ message: 'Usuário já existe' });
  // }
  await User.create(body).then((user) => {
    const token = createToken(user.dataValues);
    return res.status(StatusCodes.CREATED).json({ token });
  });
});

router.get('/', verifyToken, async (req, res) => {
  await User.findAll().then((users) => {
    const usersList = users.map((user) => user.dataValues);

    return res.status(StatusCodes.OK).json(usersList);
  });
});

module.exports = router;
