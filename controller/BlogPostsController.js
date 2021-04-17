const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { BlogPosts, Users } = require('../models');

const router = Router();

const secret = 'cabeça';

const postsValidation = require('../utils/postsValidation');

const statusCreate = 201;

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

module.exports = router;
