const rescue = require('express-rescue');
const { Op } = require('sequelize');
const { BlogPosts, Users } = require('../models');
const Status = require('../dictionary/StatusCode');

const getAllPosts = rescue(async (_req, res) => {
  const posts = await BlogPosts.findAll({ include:
    { model: Users, as: 'user', attributes: { exclude: 'password' } } });
  res.status(Status.code200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({ where: { id },
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } } });
  res.status(Status.code200).json(post);
});

const createNewPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;
  await BlogPosts.create({ title, content, userId: id });
  return res.status(Status.code201).json({ title, content, userId: id });
});

const editPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.userIdFromMiddleware.id;
  await BlogPosts.update({ title, content }, { where: { id } });
  return res.status(Status.code200).json({ title, content, userId });
});

const getPostByQuery = rescue(async (req, res) => {
  console.log('AQUI É ONDE TODAS AS REQ APARECEM', req.query);
  const { q } = req.query;
  if (q === '') {
    const posts = await BlogPosts.findAll({ include:
      { model: Users, as: 'user', attributes: { exclude: 'password' } } });
    return res.status(Status.code200).json(posts);
  }
  const postsByQuery = await BlogPosts.findAll({
    where: { [Op.or]: [{ title: { [Op.substring]: `%${q}%` } }, { content: { [Op.substring]: `%${q}%` } }] },
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
  });
  return res.status(Status.code200).json(postsByQuery);
});

const destroyPost = rescue(async (req, res) => {
  const { id } = req.params;
  await BlogPosts.destroy({ where: { id } });
  return res.status(Status.code204).send();
});

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
  editPostById,
  getPostByQuery,
  destroyPost,
};
