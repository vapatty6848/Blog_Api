const { Op } = require('sequelize');
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

const getPostsById = async (userId) => {
  const posts = await BlogPosts.findByPk(userId, {
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  return posts;
};

const updatePost = async (id, newTitle, newContent) => {
  await BlogPosts.update({
    title: newTitle,
    content: newContent,
  }, {
    where: { userId: id },
  });
  return { title: newTitle, content: newContent, userId: +id };
};

const getQuery = async (q) => {
  const post = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${q}%`,
          },
        },
      ],
    },
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  return post;
};

module.exports = {
  addPost,
  getPosts,
  getPostsById,
  getQuery,
  updatePost,
};
