const PostRouter = require('express').Router();
const { Op } = require('sequelize');
// const createToken = require('../Auth/createToken');
const { PostsServices } = require('../services');
const { BlogPost } = require('../models');
const verifyAuthorization = require('../middleware/verifyAuthorization');
// const User = require('../models');

PostRouter.post('/', verifyAuthorization, PostsServices.validatePost, async (req, res) => {
  const { title, content } = req.body;
  const date = Math.floor(Date.now() / 1000);
  const { id } = req.payload.id;
  await BlogPost.create({ title, content, userId: id, published: date, updated: date });
  res.status(200).json({ title, content, user: req.payload.id });
});

PostRouter.get('/', verifyAuthorization, async (req, res) => {
  const data = await BlogPost.findAll();
  // const data = await BlogPost
  //  .findAll({ include: { model: User, as: 'user' } }); - CONTINUAÇÃO - JUNTAR AS DUAS TABELAS
  res.status(200).json(data);
});

PostRouter.get('/search', verifyAuthorization, async (req, res) => {
  const query = `%${req.query.q}%`;
  const data = await BlogPost
    .findAll({ where: { [Op.or]: [{ title: { [Op.like]: query } },
      { content: { [Op.like]: query } }] } });
  res.status(200).json(data);
});

PostRouter.get('/:id', verifyAuthorization, async (req, res) => {
  try {
    const data = await BlogPost.findByPk(req.params.id);
    if (!data) throw new Error('Post não existe');
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

PostRouter.patch('/:id',
  verifyAuthorization,
  PostsServices.validatePost,
  PostsServices.validatePostOwner,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const date = Math.floor(Date.now() / 1000);
      await BlogPost.update({
        title, content, updated: date },
      { where: { id: req.params.id } });
      const data = await BlogPost.findByPk(req.params.id);
      res.status(200).json({ title: data.title, content: data.content, userId: data.userId });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

PostRouter.delete('/:id',
  verifyAuthorization,
  PostsServices.validatePostOwner,
  async (req, res) => {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  });
module.exports = PostRouter;
