const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const CustomErr = require('../utils/customErr');
const { BlogPost, User } = require('../models');
const user = require('./userService');
const postValidator = require('../validations/postValidation');

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

const edit = async (title, content, id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  postValidator(title, content);
  if (userId !== post.userId) throw new CustomErr(StatusCodes.UNAUTHORIZED, 'Usuário não autorizado');
  post.title = title;
  post.content = content;
  await post.save();
  return post;
};

const destroyPost = async (id, userById) => {
  const post = await BlogPost.findOne({ raw: true, where: { id } });
  if (!post) throw new CustomErr(StatusCodes.NOT_FOUND, 'Post não existe');
  if (userById !== post.userId) throw new CustomErr(StatusCodes.UNAUTHORIZED, 'Usuário não autorizado');
  await BlogPost.destroy({ where: { id } });
};

const search = async (query) => (
  BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: {
          [Op.substring]: `%${query}%` },
        },
        { content: {
          [Op.substring]: `%${query}%` },
        },
      ],
    },
    include: {
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
  })
);

module.exports = {
  destroyPost,
  createPost,
  getAll,
  getById,
  edit,
  search,
};