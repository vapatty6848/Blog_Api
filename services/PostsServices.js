const { BlogPosts } = require('../models');

const createNewPost = async (title, content, userId) => {
  await BlogPosts.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
};

module.exports = {
  createNewPost,
};
