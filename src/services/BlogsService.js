const BlogsRepository = require('../database/repositories/BlogsRepository');

const createBlog = async (blogData) => BlogsRepository.create(blogData);

module.exports = {
  createBlog,
};
