const { Post } = require('../models');

const CreatePostController = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({ title, content });

  res.status(201).json(post);
};

module.exports = CreatePostController;
