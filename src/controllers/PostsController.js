const { Op } = require('sequelize');
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
  const { q } = req.query;
  let posts = [];
  if (q.length === 0) {
    posts = await BlogPosts.findAll({
      include: { model: Users, as: 'user' },
      attributes: { exclude: ['userId'] },
    });
    res.status(status.ok).json(posts);
  } else {
    posts = await BlogPosts.findAll(
      {
        where: {
          [Op.or]: [
            { title: { [Op.substring]: q } },
            { content: { [Op.substring]: q } },
          ],
        },
        include: { model: Users, as: 'user' },
        attributes: { exclude: ['userId'] },
      },
    );
    res.status(status.ok).json(posts);
  }
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

const updatePost = async (req, res, next) => {
  const { user, title, content } = req.body;
  const { id } = req.params;

  try {
    const { userId } = await BlogPosts.findByPk(id);

    if (!userId) throw new ThrowError(status.notFound, messages.missingPost);
    if (userId !== user.id) throw new ThrowError(status.unauthorized, messages.unauthorizedUser);

    await BlogPosts.update({ title, content, updated: new Date() }, { where: { id } });
    res.status(status.ok).json({ title, content, userId: user.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  searchPost,
  getPostById,
  getAllPosts,
  updatePost,
};
