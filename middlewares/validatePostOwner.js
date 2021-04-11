const { User, BlogPost } = require('../models');
const verifyToken = require('../auth/verifyToken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { email } = verifyToken(token);

  const user = await User.findOne({ where: { email } });

  const post = await BlogPost.findOne({ where: { id } });

  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  next();
};
