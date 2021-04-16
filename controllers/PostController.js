const { Router } = require('express');
const { BlogPost, User } = require('../models');
const postValidations = require('../middlewares/postValidations');
const comebackResponse = require('../util/comebackResponse');
const messages = require('../util/returnedMessages');

const PostController = Router();
PostController.post('/',
  postValidations.validateTitleAndContent,
  async (req, res) => {
    const { title, content } = req.body;
    const now = new Date();
    await BlogPost
      .create({ title, content, userId: req.validUser.id, published: now, updated: now });
    res.status(201).json({ title, content, userId: req.validUser.id });
  });

PostController.get('/', async (_req, res) => {
  const allPosts = await BlogPost.findAll({ include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }] });
  res.status(200).json(allPosts);
});

PostController.get('/:id', async (req, res) => {
  const post = await BlogPost.findAll({
    where: { id: req.params.id },
    attributes: { exclude: ['userId'] },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }],
  });
  if (!post.length) return comebackResponse(res, 404, messages.postNotfound);
  return res.status(200).json(post[0]);
});

module.exports = PostController;
