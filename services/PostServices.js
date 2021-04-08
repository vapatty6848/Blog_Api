const { BlogPost, User } = require('../models');

const createPost = async (bodyData) => BlogPost.create(bodyData);

const findAllPosts = async () => BlogPost.findAll({
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

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
};
