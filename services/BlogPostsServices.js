const { BlogPost, User } = require('../models');

const createPost = (title, content, userId) => {
  const published = new Date();
  const updated = new Date();
  const post = BlogPost.create({ title, content, userId, published, updated });

  return post;
};

const getPosts = () => BlogPost
  .findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] } }],
    attributes: { exclude: ['userId'] },
  });

module.exports = {
  createPost,
  getPosts,
};
