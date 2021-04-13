// const { Op } = require('sequelize');
const { BlogPosts } = require('../models');

const createNewPost = async (title, content, userId) => {
  await BlogPosts.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
};

const listPostsId = async (id) => {
  const post = await BlogPosts.findAll({
    where: {
      id,
    },
    include: {
      association: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
  });
  return post;
};

const listPosts = async () => {
  const post = await BlogPosts.findAll({
    include: {
      association: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
  });
  return post;
};

const editPosts = async (id, title, content, userId) => {
  try {
    const findPost = await BlogPosts.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!findPost) return null;

    await BlogPosts.update(
      {
        title,
        content,
      },
      { where: { id } },
    );

    return (title, content, userId);
  } catch (error) {
    console.log('erro interno edit', error.message);
  }
};

const postDelete = async (id, userId) => {
  try {
    const postDeleted = await BlogPosts.destroy({
      where: { id, userId },
    });
    return postDeleted;
  } catch (error) {
    console.log('erro interno delete', error.message);
  }
};

module.exports = {
  createNewPost,
  listPosts,
  listPostsId,
  editPosts,
  postDelete,
};
