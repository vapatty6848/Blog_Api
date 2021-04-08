const rescue = require('express-rescue');
const { BlogPosts, Users } = require('../models');
const Status = require('../dictionary/StatusCode');

const getAllPosts = rescue(async (_req, res) => {
  const posts = await BlogPosts.findAll({ include:
    { model: Users, as: 'user', attributes: { exclude: 'password' } } });
  res.status(Status.code200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const posts = await BlogPosts.findOne({ include:
    { model: Users, as: 'user', attributes: { exclude: 'password' } },
  where: { id } });
  res.status(Status.code200).json(posts);
});

const createNewPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;
  await BlogPosts.create({ title, content, userId: id });
  return res.status(Status.code201).json({ title, content, userId: id });
});

module.exports = {
  createNewPost,
  getAllPosts,
  getPostById,
};
