const { Op } = require('sequelize');
const { BlogPost, User } = require('../models');

const createPost = async (bodyData) => BlogPost.create(bodyData);

const findAllPosts = async () => BlogPost.findAll({
  attributes: { exclude: ['userId'] },
  include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
});

const findPostsByTherm = async (therm) => BlogPost.findAll({
  where: {
    [Op.or]: [
      {
        title: {
          [Op.like]: `%${therm}%`,
        },
      },
      {
        content: {
          [Op.like]: `%${therm}%`,
        },
      },
    ],
  },
  attributes: { exclude: ['userId'] },
  include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
});

const findPostById = async (id) => {
  const post = await BlogPost.findByPk(id);
  const user = await post.getUser();
  delete post.dataValues.userId;
  delete user.password;
  return { ...post.dataValues, user };
};

const updatePost = async (dataBody, id) => BlogPost.update(
  { ...dataBody },
  {
    where: { id },
  },
);

const deletePost = async (id) => User.destroy({ where: { id } });

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
  findPostsByTherm,
  deletePost,
};
