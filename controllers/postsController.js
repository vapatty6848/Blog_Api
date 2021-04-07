const express = require('express');
const { BlogPosts } = require('../models');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/', authToken, async (request, response) => {
  const { title, content } = request.body;

  if (!title) return response.status(400).send({ message: '"title" is required' });
  if (!content) return response.status(400).send({ message: '"content" is required' });

  try {
    const { id } = request.user;
    const post = await BlogPosts.create({ title, content, userId: id });
    return response.status(201).json(post);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
