const { BlogPosts } = require('../models');

async function create(newBlogpost) {
  const { title, content, published, updated, userId } = newBlogpost;
  try {
    await BlogPosts.create({ title, content, published, updated, userId });
    return { title, content, userId };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  create,
};
