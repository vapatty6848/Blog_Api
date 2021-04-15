const PostRouter = require('express').Router();
const { Op } = require('sequelize');
// const createToken = require('../Auth/createToken');
const { PostsServices } = require('../services');
const { BlogPost, User } = require('../models');
const verifyAuthorization = require('../middleware/verifyAuthorization');

PostRouter.post('/', verifyAuthorization, PostsServices.validatePost, async (req, res) => {
  const { title, content } = req.body;
  const date = Math.floor(Date.now() / 1000);
  const { id } = req.payload.id;
  await BlogPost.create({ title, content, userId: id, published: date, updated: date });
  return res.status(201).json({ title, content, userId: id });
});

PostRouter.get('/', verifyAuthorization, async (req, res) => {
  // const data = await BlogPost.findAll();
  try {
    const data = await BlogPost.findAll({ include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }] });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ message: err.message });
  }
});

PostRouter.get('/search', verifyAuthorization, async (req, res) => {
  if (req.query.q === '') {
    console.log(req.query.q, 'asdasd');
    const data = await BlogPost
      .findAll({ include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }] });
    return res.status(200).json(data);
  }
  const query = `%${req.query.q}%`;
  const data = await BlogPost
    .findAll({ where: { [Op.or]: [{ title: { [Op.like]: query } },
      { content: { [Op.like]: query } }] },
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }] });
  if (data.length === 0) return res.status(200).json([]);
  return res.status(200).json(data);
});

PostRouter.get('/:id', verifyAuthorization, async (req, res) => {
  try {
    const data = await BlogPost.findByPk(req.params.id, { include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }] });
    if (!data) throw new Error('Post não existe');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

PostRouter.put('/:id',
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
      return res.status(200)
        .json({ title: data.title, content: data.content, userId: data.userId });
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  });

PostRouter.delete('/:id',
  verifyAuthorization,
  PostsServices.validatePostOwner,
  async (req, res) => {
    await BlogPost.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  });
module.exports = PostRouter;
