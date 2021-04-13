const express = require('express');
const { BlogPost, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { title, content, userId, published, updated } = req.body;
    const posts = await BlogPost.create({ title, content, userId, published, updated });
    if (posts) return res.status(200).json(posts);
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
