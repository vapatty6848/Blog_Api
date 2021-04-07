const { BlogPost, User } = require('../../models');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

const authorDoesNotMatch = {
  payload: { message: 'Usuário não autorizado' },
  status: UNAUTHORIZED,
};

const postDoesNotExists = {
  payload: { message: 'Post não existe' },
  status: NOT_FOUND,
};

const validatePostAuthor = async ({ postId, userId }) => {
  const result = await BlogPost.findAll({
    where: { id: postId },
    include: [{ model: User, as: 'user' }],
  });

  if (!result.length) return postDoesNotExists;

  const { dataValues: { user: { id } } } = result[0];

  if (id !== userId) return authorDoesNotMatch;
  return true;
};

module.exports = validatePostAuthor;
