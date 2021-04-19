const { Post } = require('../../models');

const getPostById = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.findOne({ where: { id } });
  res.status(200).json(posts);
};

module.exports = getPostById;
