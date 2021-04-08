const { BlogPost } = require('../models');

const createPost = async (bodyData) => BlogPost.create(bodyData);

const findAllUsers = async () => BlogPost.findAll();

module.exports = {
  createPost,
  findAllUsers,
};
