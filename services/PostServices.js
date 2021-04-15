const { BlogPosts, User } = require('../models');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  switch (true) {
    case (!title): return res.status(400).json({ message: '"title" is required' });
    case (!content): return res.status(400).json({ message: '"content" is required' });
    default: break;
  }

  const post = await BlogPosts.create({ title, content, userId: id });
  delete post.dataValues.id;

  return res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne({
    where: { id },
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  res.status(200).json(post);
};

// const deleteUser = async (req, res) => {
//   const { id } = req.user;

//   await User.destroy({ where: { id } });

//   return res.status(204).send();
// };

module.exports = {
  createPost,
  getPosts,
  getPostById,
  // updatePostById,
  // deletePost,
};
