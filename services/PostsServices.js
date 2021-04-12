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
const listPostsId = async (id) => {
  const post = await BlogPosts.findAll({
    where: {
      id,
    },
    include: {
      association: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
  });
  return post;
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
  listPostsId,
};
