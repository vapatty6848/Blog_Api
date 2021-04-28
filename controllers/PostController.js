const { Router } = require('express');
const { BlogPost, User } = require('../models');
const postValidations = require('../middlewares/postValidations');

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

PostController.get('/search', async (req, res) => {
  const { q } = req.query;
  const lowerCase = q.toLowerCase();
  const allPosts = await BlogPost.findAll({ include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }] });

  const foundPost = allPosts
    .filter((post) => (post.title.toLowerCase().indexOf(lowerCase) !== -1)
    || (post.content.toLowerCase().indexOf(lowerCase) !== -1));

  res.status(200).json(foundPost);
});

PostController.get('/:id',
  postValidations.validatePost(404),
  async (req, res) => {
    const { id } = req.params;
    const post = await BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['userId'] },
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
    });
    return res.status(200).json(post);
  });

PostController.put('/:id',
  postValidations.validatePost(401),
  postValidations.validateTitleAndContent,
  postValidations.validateSameUser,
  async (req, res) => {
    const { body: { title, content }, params: { id }, validUser } = req;
    const now = new Date();
    await BlogPost.update(
      { title, content, updated: now },
      { where: { id } },
    );
    return res.status(200).json({ title, content, userId: validUser.id });
  });

PostController.delete('/:id',
  postValidations.validatePost(404),
  postValidations.validateSameUser,
  async (req, res) => {
    const { id } = req.params;
    await BlogPost.destroy({ where: { id } });
    return res.status(204).end();
  });

module.exports = PostController;
