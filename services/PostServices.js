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

const userModel = {
  model: User,
  as: 'user',
  attributes: ['id', 'displayName', 'email', 'image'],
};

const getPosts = async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: userModel,
  });
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne({
    where: { id },
    include: userModel,
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  res.status(200).json(post);
};

const updatePostById = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const post = await BlogPosts.findOne({ where: { id } });
  const isAuthor = (post.dataValues.userId === req.user.id);

  switch (true) {
    case (!title): return res.status(400).json({ message: '"title" is required' });
    case (!content): return res.status(400).json({ message: '"content" is required' });
    case (!post): return res.status(404).json({ message: 'Post não existe' });
    case (!isAuthor): return res.status(401).json({ message: 'Usuário não autorizado' });
    default: break;
  }

  await BlogPosts.update({ title, content }, { where: { id } });
  next();
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne({ where: { id } });
  const isAuthor = (post && post.dataValues.userId === req.user.id);

  switch (true) {
    case (!post): return res.status(404).json({ message: 'Post não existe' });
    case (!isAuthor): return res.status(401).json({ message: 'Usuário não autorizado' });
    default: break;
  }

  await BlogPosts.destroy({ where: { id } });

  return res.status(204).send();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePost,
  userModel,
};
