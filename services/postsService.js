const { BlogPosts } = require('../models');
const { decodeToken } = require('./token');

const validatePost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { title, content } = req.body;

  const post = await BlogPosts.findOne({ where: { id } });
  const user = decodeToken(authorization);
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (post.userId !== user.id) return res.status(401).json({ message: 'Usuário não autorizado' });

  next();
};

const validateDelete = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const post = await BlogPosts.findOne({ where: { id } });
  const user = decodeToken(authorization);
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (post.userId !== user.id) return res.status(401).json({ message: 'Usuário não autorizado' });

  next();
};

module.exports = {
  validatePost,
  validateUpdate,
  validateDelete,
};
