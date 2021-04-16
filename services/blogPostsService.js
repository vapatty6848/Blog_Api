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

const updatePost = async (id, title, userId, content) => {
  const updated = await BlogPosts.findOne({ where: { id } });
  if (userId !== updated.userId) return false;
  updated.title = title;
  updated.content = content;
  await updated.save();
  return updated;
};

const deletePost = async (id, userId) => {
  const postDeleted = await BlogPosts.destroy({ where: { id, userId } });
  // if (userId !== postDeleted.userId) return false;
  console.log('delete', postDeleted);
  return postDeleted;
};

module.exports = {
  listAllBlogPosts,
  createNewPost,
  postsId,
  updatePost,
  deletePost,
};
