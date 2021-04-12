const express = require('express');
const { User } = require('../models');
const { validateUserRegister } = require('../middlewares/UserMiddleware');
const tokenGenerator = require('../utils/TokenGenerator');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateUserRegister, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, email, password, image });
  const { password: pwd, ...UserWithoutPassword } = user;
  const token = tokenGenerator(UserWithoutPassword);
  res.locals.user = token;
  res.status(201).json({ token });
});

router.get('/', validateToken, async (req, res, next) => {
  try {
    // const { authorization } = req.headers;
    // if (!authorization) {
    //   // res.status(401).json({ message: 'Token não encontrado' });
    //   return next({
    //     status: 401,
    //     message: 'Token não encontrado',
    //   });
    // }
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, _next) => {
  await User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Usuário não encontrado' });
      }
      //  http GET :3000/login/1\?includeBlogPosts=1
      //  linha 10 em User models
      if (!req.query.includeBlogPosts) return res.status(200).json(user);

      return user.getBlogPosts().then((posts) => {
        res.status(200).json({ ...user.dataValues, posts });
      });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.delete('/:id', async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((users) => {
      res.status(200).send({ message: 'Usuário excluído com sucesso.', users });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

router.put('/:id', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await User.update(
    { displayName, email, password, image },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((users) => {
      res.status(200).send({ message: 'Usuário atualizado com sucesso.', users });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;
