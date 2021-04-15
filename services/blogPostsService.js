const { BlogPosts, User } = require('../models');

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
  const listOfPosts = await BlogPosts.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  return listOfPosts;
};

const postsId = async (id) => {
  const listOfPostsId = await BlogPosts.findAll({
    where: { id },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
  });
  return listOfPostsId;
};

const update = async (title, content, userId) => {
  const updated = await BlogPosts.update({ where: { title, content, userId } });
  return updated;
};

module.exports = {
  listAllBlogPosts,
  createNewPost,
  postsId,
  update,
};
