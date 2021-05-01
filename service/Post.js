const { BlogPosts } = require('../models');
const errorFormatter = require('../middleware/errorFormatter');

const createPost = async ({ title, content, userId }) => {
  try {
    console.log(title);
    const posted = await BlogPosts.create({ title, content, userId });
    console.log('posted: ', posted);
    return { title, content, userId };
  } catch (e) {
    console.log(e);
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

module.exports = {
  createPost,
};
