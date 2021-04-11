const { validatePost } = require('../schema/ValidateSchema');
const blogPostService = require('../services/BlogPostsService');

const { UNAUTHORIZED, NOT_FOUND } = require('../schema/statusSchema');

const validateFieldsPost = async (req, res, next) => {
  const { title, content } = req.body;

  const validations = await validatePost(title, content);

  if (validations.message) {
    return res.status(validations.status).json({ message: validations.message });
  }

  next();
};

const validateOwnerPost = async (req, res, next) => {
  const userIdToken = req.user.id;
  const { id } = req.params;
  const post = await blogPostService.getById(id);
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post não existe' });

  const userId = post.dataValues.user_id;
  if (userId !== userIdToken) return res.status(UNAUTHORIZED).json({ message: 'Usuário não autorizado' });

  next();
};

module.exports = {
  validateFieldsPost,
  validateOwnerPost,
};
