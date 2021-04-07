const express = require('express');
const { BlogPost } = require('../models');
const validateToken = require('../auth/validateToken');
// const userService = require('../services/userService');

const router = express.Router();

router.post('/', validateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = 1;// Ver como pegar este userId
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  await BlogPost.create({ userId, title, content });
  res.status(201).json({ userId, title, content });
});

// router.get('/', validateToken, async (req, res) => {
//   const userId = 1;// Ver como pegar este userId
//   const posts = await userService.getAllPostsByUser(userId);
//   res.status(200).json(posts);
// });

module.exports = router;
