const { Router } = require('express');
// const { Op } = require('sequelize');
// o Op deixa vc usa in between etc
const router = Router();

const { BlogPosts } = require('../models');

router.get('/', async (req, res) => {
  const blogPost = await BlogPosts.findAll();
  res.status(200).json(blogPost);
});

module.exports = router;
