const express = require('express');
const { User } = require('../models');
const { validateUserRegister } = require('../middlewares/UserMiddleware');
const { tokenGenerator, getTokenUser } = require('../utils/TokenUtils');
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
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send({ message: 'Usuário não existe' });
    if (!req.query.includeBlogPosts) return res.status(200).json(user);
    const posts = await user.getBlogPosts();
    if (posts) return res.status(200).json({ ...user.dataValues, posts });
  } catch (err) {
    next(err);
  }
});

router.delete('/me', validateToken, async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const email = getTokenUser(token);
    await User.destroy({ where: { email } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
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
