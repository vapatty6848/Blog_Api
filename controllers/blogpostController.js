const express = require('express');
const { Op } = require('sequelize');

const { Blogpost, User } = require('../models');

const blogpostRouter = express.Router();

// middlewares
const verifyToken = require('../middlewares/verifyToken');
const isTitle = require('../middlewares/isTitle');
const isContent = require('../middlewares/isContent');
const returnAllPosts = require('../middlewares/returnAllPosts');

// auth
const validateToken = require('../auth/validateToken');
// const { verify } = require('jsonwebtoken');

blogpostRouter.get('/search', returnAllPosts, verifyToken, async (req, res) => {
  const { q } = req.query;

  const arraySearch = await Blogpost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.substring]: q },
        content: { [Op.substring]: q },
      },
    },
    include: [{
      model: User,
      as: 'user',
    }],
    attributes: { exclude: ['userId'] },
  });

  return res.status(200).json(arraySearch);
});

blogpostRouter.post('/', verifyToken, isTitle, isContent, (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const payload = validateToken(authorization);
  const userId = payload.id;

  Blogpost.create({ title, content, userId })
    .then(() => {
      res.status(201).json({ title, content, userId });
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Erro Interno' });
    });
});

blogpostRouter.get('/', verifyToken, async (_req, res) => {
  const listBlogpost = await Blogpost.findAll({
    include: [{
      model: User,
      as: 'user',
    }],
    attributes: { exclude: ['userId'] },
  });

  return res.status(200).json(listBlogpost);
});

blogpostRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const payload = validateToken(authorization);

  const postWillBeDelete = await Blogpost.findByPk(id);

  if (!postWillBeDelete) return res.status(404).json({ message: 'Post não existe' });

  if (postWillBeDelete.userId === payload.id) {
    await Blogpost.destroy({
      where: {
        id,
      },
    });
    return res.status(204).json();
  }
  return res.status(401).json({ message: 'Usuário não autorizado' });
});

blogpostRouter.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  const onePost = await Blogpost.findOne({
    where: {
      id,
    },
    include: [{
      model: User,
      as: 'user',
    }],
    attributes: { exclude: ['userId'] },
  });

  if (!onePost) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(onePost);
});

blogpostRouter.put('/:id', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const payload = validateToken(authorization);
  const postWillBeUpdate = await Blogpost.findByPk(id);

  if (payload.id !== postWillBeUpdate.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  postWillBeUpdate.title = title;
  postWillBeUpdate.content = content;
  await postWillBeUpdate.save();
  return res.status(200).json({
    title: postWillBeUpdate.title, content: postWillBeUpdate.content, userId: payload.id,
  });
});

module.exports = blogpostRouter;
