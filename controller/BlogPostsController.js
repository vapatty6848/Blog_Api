const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { BlogPosts, Users } = require('../models');

const router = Router();

const secret = 'cabeça';

const postsValidation = require('../utils/postsValidation');

const statusCreate = 201;
const statusOK = 200;

router.post('/', postsValidation.createPost, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;

  const { data } = jwt.verify(token, secret);
  const { dataValues } = await Users.findOne({ where: { email: data.email } });

  const published = new Date();
  const updated = new Date();

  await BlogPosts.create({ title, content, userId: dataValues.id, published, updated });

  const returned = {
    title,
    content,
    userId: dataValues.id,
  };
  return res.status(statusCreate).send(returned);
});

router.get('/', postsValidation.getAllPosts, async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: { model: Users, as: 'user' },
  });

  return res.status(statusOK).json(posts);
});

router.get('/:id', postsValidation.getById, async (req, res) => {
  const { id } = req.params;

  const findById = await BlogPosts.findByPk(id, {
    include: { model: Users, as: 'user' },
  });

  res.status(statusOK).json(findById);
});

module.exports = router;
