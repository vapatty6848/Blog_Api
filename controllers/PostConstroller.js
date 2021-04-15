const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { validContent, validTitle } = require('../middlewares/postValidations');
const { BlogPost, User } = require('../models');
const validateAuth = require('../middlewares/authValidate');

const postController = Router();

postController.post('/', validateAuth, validContent, validTitle, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const { email } = jwt.decode(authorization);
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  const newPost = await BlogPost.create({ title, content, userId });
  return res.status(201).json(newPost);
});

postController.get('/', validateAuth, async (_req, res) => {
  const listPosts = await BlogPost.findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });
  return res.status(200).json(listPosts);
});

postController.get('/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const onePost = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user' }],
    attributes: { exclude: ['userId'] },
  });
  if (!onePost || onePost === '') {
    return res.status(404).json({ message: 'Post não existe' });
  }
  return res.status(200).json(onePost);
});

postController.delete('/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { email } = jwt.decode(authorization);
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  const postExists = await BlogPost.findByPk(id);

  if (!postExists || postExists === ' ') {
    return res.status(404)
      .send({ message: 'Post não existe' });
  }

  if (postExists.userId === userId) {
    await BlogPost.destroy({ where: { id } });
    return res.status(204).send();
  }
  return res.status(401).send({ message: 'Usuário não autorizado' });
});

// postController.put('/:id', validateAuth, async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   const userId = req.userIdFromMiddleware.id;
//   await BlogPost.update({ title, content }, { where: { id } });
//   return res.status(200).json({ title, content, userId });
// });

module.exports = postController;
