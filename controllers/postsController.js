const express = require('express');
const { BlogPost, User } = require('../models');
const { validatePost } = require('../middlewares/PostMiddleware');
const { getTokenUser } = require('../utils/TokenUtils');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validatePost, validateToken, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { authorization: token } = req.headers;
    const { id: userId } = getTokenUser(token);
    const { dataValues: { id, ...post } } = await BlogPost.create({ title, content, userId });
    if (post) return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll();
    if (posts) return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const posts = await BlogPost.findByPk(req.params.id, {
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { exclude: ['userId', 'id'] },
    });
    if (!posts) return res.status(404).send({ message: 'Post não encontrado' });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const posts = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (posts) return res.status(200).send({ message: 'Post excluído com sucesso.' }, posts);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, userId, published, updated } = req.body;
    const posts = await BlogPost.update(
      { title, content, userId, published, updated },
      { where: { id: req.params.id } },
    );
    return res.status(200).send({ message: 'Post atualizado com sucesso.' }, posts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
