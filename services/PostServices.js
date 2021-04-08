const { BlogPost, User } = require('../models');

const createPost = async (bodyData) => BlogPost.create(bodyData);

const findAllUsers = async () => BlogPost.findAll({
  attributes: { exclude: ['userId']},
  include: { model: User, as: 'user', attributes:{ exclude: ['password']}},
});

module.exports = {
  createPost,
  findAllUsers,
};
