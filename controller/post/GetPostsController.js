const { BlogPost, User } = require('../../models');

const getPosts = async (_req, res) => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user' }],
  });
  res.status(200).json(posts);
};

module.exports = getPosts;
