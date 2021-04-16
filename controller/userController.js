const express = require('express');
const { User } = require('../models');
const { registerUser, verifyToken } = require('../middlewares/UserMid');
const {
  secret,
  jwtConfig,
  createJWTPayload,
  jwtSign,
} = require('../auth/ValidateToken');

const userRouter = express.Router();

userRouter.get('/', verifyToken, async (_req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

userRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findOne({ where: { id } });
    if (user) return res.status(200).json(user);
    return res.status(404).json({ message: 'Usuário não existe' });
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

userRouter.post('/', registerUser, async (req, res) => {
  try {
    const resultFind = await User.findOne({ where: { email: req.body.email } });
    if (resultFind) return res.status(409).json({ message: 'Usuário já existe' });
    const { displayName, email, password, image } = req.body;

    const newUser = await User.create({ displayName, email, password, image });
    const createPay = createJWTPayload(newUser);
    const tokenCreated = jwtSign(createPay, secret, jwtConfig);
    return res.status(201).json({ token: tokenCreated });
  } catch (error) {
    return res.status(500).send({ message: 'Algo deu errado' });
  }
});

userRouter.delete('/me', verifyToken, async (req, res) => {
  try {
    const { userData } = req;
    const tokenUserEmail = userData.id;
    const deletedUser = await User.destroy({ where: { id: tokenUserEmail } });
    if (deletedUser === null) return res.status(404).json({ message: 'Usuário não existe' });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = userRouter;
