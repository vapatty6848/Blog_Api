const { BlogPost } = require('../models');

const BlogPostService = async (title, content, userId) => {
  console.log(title, content, userId);
  await BlogPost.create({ title, content, userId });
};

module.exports = BlogPostService;
