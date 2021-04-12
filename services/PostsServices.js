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
const listPosts = async () => {
  const post = await BlogPosts.findAll({
    include: {
      association: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
  });
  return post;
};
module.exports = {
  createNewPost,
  listPosts,
};
