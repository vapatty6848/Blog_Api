const { BlogPosts, Users } = require('../../models');
const { status, messages } = require('../libs/dicts');
const { ThrowError } = require('../middlewares/errorHandler/utils');

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

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await BlogPosts.findOne({
      where: { id },
      include: { model: Users, as: 'user' },
      attributes: { exclude: ['userId'] },
    });
    if (!post) throw new ThrowError(status.notFound, messages.missingPost);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res) => {
  const responsePayload = await BlogPosts.findAll({
    include: { model: Users, as: 'user' },
    attributes: { exclude: ['userId'] },
  });
  res.status(200).json(responsePayload);
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
