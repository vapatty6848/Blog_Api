const { BlogPost, User } = require('../database/models');

const { UNAUTHORIZED, NOT_FOUND } = require('../errors/status');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  const post = await BlogPost.findByPk(id);
  const user = await User.findByPk(userId);

  if (!post) return res.status(NOT_FOUND).json({ message: 'Post não existe' });

  if (post.dataValues.userId !== user.dataValues.id) {
    return res.status(UNAUTHORIZED).json({ message: 'Usuário não autorizado' });
  }

  next();
};
