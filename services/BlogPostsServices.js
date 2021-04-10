const { BlogPost } = require('../models');

const createPost = (title, content, userId) => {
  const published = new Date();
  const updated = new Date();
  const post = BlogPost.create({ title, content, userId, published, updated });

  return post;
};

module.exports = {
  createPost,
};
