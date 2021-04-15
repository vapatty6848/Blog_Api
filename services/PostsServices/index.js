const { BlogPost, User } = require('../../models');
// const validateToken = require('../Auth/validateToken');

const validatePost = async (req, res, next) => {
  const ERROR = 400;
  try {
    const { title, content } = req.body;
    if (!title) throw new Error('"title" is required');
    if (!content) throw new Error('"content" is required');
    next();
  } catch (err) {
    return res.status(ERROR).json({ message: err.message });
  }
};

const validatePostOwner = async (req, res, next) => {
  try {
    const user = req.payload.id;
    const getPost = await BlogPost.findByPk(req.params.id);
    if (!getPost) throw new Error('Post não existe');
    if (getPost.userId !== user.id) throw new Error('Usuário não autorizado');
    next();
  } catch (err) {
    return res.status(err.message === 'Post não existe' ? 404 : 401)
      .send({ message: err.message.code ? err.message.er : err.message });
  }
};

const searchPostOwner = async (userId) => User.findByPk(userId, { attributes: ['id', 'displayName', 'email', 'image'] });

module.exports = { validatePost, validatePostOwner, searchPostOwner };
