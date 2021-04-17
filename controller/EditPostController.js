const { Post } = require('../models');

const editPostController = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const post = await Post.update({ title, content }, { where: { id } });

  res.status(200).json(post);
};

module.exports = editPostController;
