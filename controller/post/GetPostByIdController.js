const { BlogPost, User } = require('../../models');

const getPostById = async (req, res) => {
  const { id } = req.params;
  const posts = await BlogPost.findOne({ where: { id }, include: [{ model: User, as: 'user' }] });
  res.status(200).json(posts);
};

module.exports = getPostById;
