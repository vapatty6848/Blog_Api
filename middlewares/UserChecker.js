const { BlogPost } = require('../models');

const UserChecker = async (req, res, next) => {
  const { user } = req;
  const { id: blogPostId } = req.params;
  const blogPost = await BlogPost.findByPk(blogPostId);
  if (!blogPost) return res.status(404).json({ message: 'Post não existe' });
  if (blogPost.userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  next();
};

module.exports = UserChecker;
