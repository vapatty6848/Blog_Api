const { BlogPosts } = require('../models');

const createNewPost = async (title, content, userId) => {
  console.log('teste createNewPost\n', title, content, userId);
  await BlogPosts.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
};

const listAllBlogPosts = async () => {
  const listOfPosts = await BlogPosts.findAll();
  return listOfPosts;
};

const postsId = async (id) => {
  const listOfPostsId = await BlogPosts.findAll({
    where: { id },
  });
  return listOfPostsId;
};

module.exports = {
  listAllBlogPosts,
  createNewPost,
  postsId,
};
