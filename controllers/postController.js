const { Op } = require('sequelize');
const express = require('express');
const { BlogPosts, User } = require('../models');
const validateToken = require('../auth/validateToken');
const { getUserByEmail } = require('../services/userService');

const router = express.Router();

router.post('/', validateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  const newPost = await BlogPosts.create({ userId: id, title, content });
  res.status(201).json(newPost);
});

router.get('/', validateToken, async (_req, res) => {
  const posts = await BlogPosts.findAll({ include: { model: User, as: 'user' } });
  res.status(200).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await BlogPosts.findOne({
    where: { id },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!post) return res.status(404).send({ message: 'Post não existe' });
  res.status(200).json(post);
});

router.put('/:id', validateToken, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { email } = req.decodedUser;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  if (!title) return res.status(400).send({ message: '"title" is required' });
  if (!content) return res.status(400).send({ message: '"content" is required' });
  const postActual = await BlogPosts.findOne({ where: { id } });

  console.log(id, postActual.userId, userId);

  if (postActual.userId !== id) {
    return res.status(401).send({ message: 'Usuário não autorizado' });
  }
  // não esta funcionando o update
  const updatedPost = await BlogPosts.update({ title, content }, { where: { id, userId } });
  res.status(200).json(updatedPost);
});

router.get('/search', validateToken, async (req, res) => {
  const searchTerm = req.query.q;
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const userId = user.dataValues.id;
  console.log(searchTerm, email, user, userId);
  // Fonte : https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize
  const posts = await BlogPosts.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: {
      userId,
      [Op.or]: [
        { title: {
          [Op.like]: `%${searchTerm}%`,
        } },
        { content: {
          [Op.like]: `${searchTerm}%`,
        } },
      ],
    } });

  return res.status(200).json(posts);
});

module.exports = router;
