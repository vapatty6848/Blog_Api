const { BlogPosts, User } = require('../models');

const getDate = () => {
  const date = new Date();
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
  const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const dateAndTime = `${now} ${time}`;
  return dateAndTime;
};

const addPost = async ({ userTitle, userContent, userId }) => {
  await BlogPosts.create({
    title: userTitle,
    content: userContent,
    userId,
    published: getDate(),
    updated: getDate(),
  });
  return { title: userTitle, content: userContent, userId };
};

const getPosts = async () => {
  const posts = await BlogPosts.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  return posts;
};

module.exports = {
  addPost,
  getPosts,
};
