const express = require('express');

const { User } = require('../models');

const userRouter = express.Router();

// middleware imports
const isDisplayName = require('../middlewares/isDisplayName');
const isEmail = require('../middlewares/isEmail');
const isPassword = require('../middlewares/isPassword');
const verifyToken = require('../middlewares/verifyToken');

// auth
const createToken = require('../auth/createToken');
const validateToken = require('../auth/validateToken');

userRouter.post('/', isDisplayName, isEmail, isPassword, (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({displayName, email, password, image})
  .then((newUser) => {

    const {
       password: passwordDB, ...userWithoutPassword 
    } = newUser;
    const token = createToken(userWithoutPassword);

    return res.status(201).json({token:token});
  })
  .catch((e) => {
    console.log(e.message);
    res.status(500).send({ message: 'Erro Interno'});
  })
});

userRouter.get('/', async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({message: 'Token não encontrado'});

  const isToken = validateToken(authorization);
  if (!isToken) return res.status(401).json({message: 'Token expirado ou inválido'});

  const listUser = await User.findAll();

  return res.status(200).json(listUser);
});

userRouter.get('/', verifyToken, async (_req, res) => {

  const listUser = await User.findAll();

  return res.status(200).json(listUser);
});

userRouter.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  const findOneUser = await User.findOne({
    where: {
      id,
    }
  });

  if(!findOneUser) return res.status(404).json({message: 'Usuário não existe'})

  return res.status(200).json(findOneUser);
});

userRouter.delete('/me', verifyToken, (req, res) => {
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  User.destroy({
    where: {
        id: payload.id,
    }
  });

  res.status(204).json();
});

module.exports = userRouter;
