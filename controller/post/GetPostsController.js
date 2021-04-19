const { Post } = require('../../models');

const getPosts = async (_req, res) => {
  const posts = await Post.findAll();
  res.status(200).json(posts);
};

module.exports = getPosts;
