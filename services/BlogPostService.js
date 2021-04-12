const { Op } = require('sequelize');
const { BlogPosts, Users } = require('../models');
const {
  getPosts,
  removeObjectKeyFromArray,
  removeObjectKey,
} = require('../utils');

async function create(newBlogpost) {
  const { title, content, published, updated, userId } = newBlogpost;
  try {
    await BlogPosts.create({ title, content, published, updated, userId });
    return { title, content, userId };
  } catch (error) {
    console.log(error);
  }
}

async function getAll() {
  const queryResult = await BlogPosts.findAll({
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  const blogposts = getPosts(queryResult);
  const blogpostsInfo = removeObjectKeyFromArray(blogposts, 'userId');
  return blogpostsInfo;
}

async function getById(id) {
  try {
    const queryResult = await BlogPosts.findByPk(id, {
      include: {
        model: Users,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
    });
    if (!queryResult) return null;
    const blogpost = queryResult.dataValues;
    const blogpostInfo = removeObjectKey(blogpost, 'userId');
    return blogpostInfo;
  } catch (error) {
    console.log(error);
  }
}

async function update(id, title, content) {
  const updatedBlogPost = await BlogPosts.update(
    { title, content },
    {
      where: { id },
      returning: true, // remover
      plain: true, // remover
    },
  );

  if (!updatedBlogPost) return null;
  return updatedBlogPost;
}

async function findBySearchTerm(searchTerm) {
  if (!searchTerm) return getAll();
  const queryResult = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });
  if (!queryResult) return [];
  const blogposts = getPosts(queryResult);
  const blogpostsInfo = removeObjectKeyFromArray(blogposts, 'userId');
  return blogpostsInfo;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  findBySearchTerm,
};
