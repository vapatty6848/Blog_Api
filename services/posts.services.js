const { BlogPost, User } = require('../models');
const postValidator = require('../validations/posts.validation');

const createPost = async (title, content, userId) => {
  postValidator(title, content);
  const { dataValues } = await BlogPost.create({ title, content, userId });
  const { id, published, updated, ...data } = dataValues;
  return data;
};

const getAll = async () => BlogPost.findAll({
  attributes: { exclude: 'userId' },
  include: { model: User, as: 'user' },
});

module.exports = {
  createPost,
  getAll,
};
