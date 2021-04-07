const sequelize = require('sequelize');
const { BlogPosts, Users } = require('../models');
const { authNewPost } = require('../schemas');

const create = async (body, userId) => {
  const { title, content } = body;
  authNewPost(title, content);
  await BlogPosts.create({
    user_id: userId,
    title,
    content,
  });
  const newPost = { userId, title, content };
  return newPost;
};

const update = async (id, body, userId) => {
  const { title, content } = body;
  authNewPost(title, content);
  const postToUpdate = await BlogPosts.findOne({ where: { id } });
  if (postToUpdate.user_id !== userId) throw new Error('C_ERR_POST_NOT_AUTH');
  await BlogPosts.update(
    { title, content },
    { where: { id } },
  );
  const newPost = { userId, title, content };
  return newPost;
};

const getPosts = async (search = '') => {
  const lowerCaseSearch = search.toLowerCase();
  let filterPosts;
  if (lowerCaseSearch) {
    filterPosts = await BlogPosts.findAll({
      where: {
        [sequelize.Op.or]: [
          { title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', `%${lowerCaseSearch}%`) },
          { content: sequelize.where(sequelize.fn('LOWER', sequelize.col('content')), 'LIKE', `%${lowerCaseSearch}%`) },
        ],
      },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });
  } else {
    filterPosts = await BlogPosts.findAll({
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });
  }
  return filterPosts;
};

const getOne = async (id) => {
  const getPost = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  if (!getPost) throw new Error('C_ERR_POST_NOT_FOUND');
  return getPost;
};

const removeOne = async (id, userId) => {
  const postToRemove = await BlogPosts.findOne({ where: { id } });
  console.log('achou o post? ', postToRemove);

  if (!postToRemove) throw new Error('C_ERR_POST_NOT_FOUND');
  if (postToRemove.user_id !== userId) throw new Error('C_ERR_POST_NOT_AUTH');

  const removePost = await BlogPosts.destroy({ where: { id } });
  if (!removePost) throw new Error('C_ERR_POST_NOT_FOUND');
  return null;
};

module.exports = {
  create,
  update,
  getPosts,
  getOne,
  removeOne,
};
