const { BlogPosts } = require('../models');

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

module.exports = {
  addPost,
};
