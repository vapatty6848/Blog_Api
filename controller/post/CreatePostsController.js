const { BlogPost } = require('../../models');

const CreatePostController = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;
  const post = await BlogPost.create({ title, content, userId: id });
  res.status(201).json(post);
};

module.exports = CreatePostController;
