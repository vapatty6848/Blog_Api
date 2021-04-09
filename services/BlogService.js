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

const getPostsById = async (paramsId) => {
  const posts = await BlogPosts.findByPk(paramsId, {
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  return posts;
};

const updatePost = async (paramsId, newTitle, newContent) => {
  const data = await BlogPosts.update({
    title: newTitle,
    content: newContent,
  }, {
    where: { id: paramsId },
  });
  return data;
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

const deletePost = async (postId) => {
  await BlogPosts.destroy({
    where: {
      id: postId,
    },
  });
};

module.exports = {
  addPost,
  deletePost,
  getPosts,
  getPostsById,
  getQuery,
  updatePost,
};
