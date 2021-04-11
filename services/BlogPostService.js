const { BlogPosts, Users } = require('../models');
const { getPosts, removeObjectKeyFromArray } = require('../utils');

async function create(newBlogpost) {
  const { title, content, published, updated, userId } = newBlogpost;
  try {
    const createdPost = await BlogPosts.create({ title, content, published, updated, userId });
    return { title, content, userId };
  } catch (error) {
  }
}

async function getAll() {
  const queryResult = await BlogPosts.findAll({
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  const blogposts = getPosts(queryResult);
  const blogpostsInfo = removeObjectKeyFromArray(blogposts, 'userId');
  return blogpostsInfo;
}

module.exports = {
  create,
  getAll,
};
