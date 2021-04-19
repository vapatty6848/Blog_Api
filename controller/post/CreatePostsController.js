const { BlogPost } = require('../../models');

const CreatePostController = async (req, res) => {
  const { title, content } = req.body;

  const post = await BlogPost.create({ title, content, userId: 21 });

  res.status(201).json(post);
};

module.exports = CreatePostController;
