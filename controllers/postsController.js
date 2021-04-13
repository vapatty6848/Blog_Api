const express = require('express');
const { Op } = require('sequelize');
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

router.get('/', validateToken, async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { exclude: ['userId'] },
    });
    if (posts) return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateToken, async (req, res, next) => {
  try {
    const { q } = req.query;
    if (req.params.id !== 'search') {
      const post = await BlogPost.findByPk(req.params.id, {
        include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
        attributes: { exclude: ['userId'] },
      });
      if (!post) return res.status(404).send({ message: 'Post não existe' });
      return res.status(200).json(post);
    }
    const query = (q.length !== 0) ? { [Op.or]: [{ title: q }, { content: q }] } : {};
    const posts = await BlogPost.findAll({
      where: query,
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).json(posts);
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

router.put('/:id', validatePost, validateToken, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { authorization: token } = req.headers;
    const { id } = req.params;

    const { id: userIdToken } = getTokenUser(token);
    const { userId: userIdPost } = await BlogPost.findByPk(id);

    if (userIdToken !== userIdPost) {
      return res.status(401).send({ message: 'Usuário não autorizado' });
    }

    await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
    return res.status(200).json({ title, content, userId: userIdPost });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
