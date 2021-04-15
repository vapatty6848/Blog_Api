const { BlogPosts } = require('../models');

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
  const posts = await BlogPosts.findAll();
  return res.status(200).json(posts);
};

// const getUserById = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findOne({
//     where: { id },
//     attributes: ['id', 'displayName', 'email', 'image'],
//   });

//   if (!user) return res.status(404).json({ message: 'Usuário não existe' });

//   res.status(200).json(user);
// };

// const deleteUser = async (req, res) => {
//   const { id } = req.user;

//   await User.destroy({ where: { id } });

//   return res.status(204).send();
// };

module.exports = {
  createPost,
  getPosts,
  // getPostsById,
  // updatePostById,
  // deletePost,
};
