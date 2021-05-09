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

router.get('/', verifyToken, async (_req, res) => {
  await User.findAll().then((users) => {
    const usersList = users.map((user) => {
      const { password: _, ...userInfo } = user.dataValues;
      return userInfo;
    });

    return res.status(StatusCodes.OK).json(usersList);
  });
});

router.delete('/me', verifyToken, async (req, res) => {
  const { id } = req.payload;
  await User.destroy({ where: { id } }).then(() => res.status(StatusCodes.NO_CONTENT).json());
});

router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await User.findByPk(id).then((user) => {
    const { password: _, ...userInfo } = user.dataValues;
    return res.status(StatusCodes.OK).json(userInfo);
  }).catch((_e) => res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuário não existe' }));
});

module.exports = router;
