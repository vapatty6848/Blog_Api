const { BlogPosts } = require('../../models');
const { status } = require('../libs/dicts');

const createPost = async (req, res) => {
  const { user: { id: userId } } = req.body;
  const { title, content } = req.body;
  const responsePayload = {
    title, content, userId,
  };
  await BlogPosts.create({ title, content, userId });
  res.status(status.created).json(responsePayload);
};

const searchPost = async (req, res) => {
  res.status(200).json({ message: 'searchPost' });
};

const getPostById = async (req, res) => {
  res.status(200).json({ message: 'getPostById' });
};

const getAllPosts = async (req, res) => {
  res.status(200).json({ message: 'getAllPosts' });
};

const updatePost = async (req, res) => {
  res.status(200).json({ message: 'updatePost' });
};

module.exports = {
  createPost,
  searchPost,
  getPostById,
  getAllPosts,
  updatePost,
};
