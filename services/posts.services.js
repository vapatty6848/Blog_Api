const { StatusCodes } = require('http-status-codes');

const CustomErr = require('../utils/customErr');
const { BlogPost, User } = require('../models');
const user = require('./user.services');
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

const getById = async (id) => {
  const post = await BlogPost.findOne({ raw: true, where: { id } });
  if (!post) throw new CustomErr(StatusCodes.NOT_FOUND, 'Post não existe');
  const userData = await user.getById(post.userId);
  delete post.userId;
  delete userData.password;
  return { ...post, user: userData };
};

module.exports = {
  createPost,
  getAll,
  getById,
};
