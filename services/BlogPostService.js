const { Op } = require('sequelize');
const { BlogPosts, Users } = require('../models');
const { CREATED, INTERNAL_ERROR, OK, NOT_FOUND, UNAUTHORIZED } = require('../utils/allStatusCode');
const tokenDecoder = require('../utils/tokenDecoder');

const decode = (token) => tokenDecoder(token);

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = decode(req.headers.authorization);
  const correspondentUser = await Users.findOne({ where: { email } });
  const userId = correspondentUser.dataValues.id;
  try {
    const post = await BlogPosts.create({ userId, title, content });
    return res.status(CREATED).send(post);
  } catch (error) {
    return res.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const { email } = decode(req.headers.authorization);

  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });
  }
  const { id } = user.dataValues;
  const posts = await BlogPosts.findAll({ include: { model: Users, as: 'user', attributes: { exclude: 'password' } }, where: { userId: id } });
  res.status(OK).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPosts.findByPk(id, {
    include: {
      model: Users,
      as: 'user',
      attributes: { exclude: 'password' },
    },
    where: { userId: id },
  });
  if (!post) {
    return res.status(NOT_FOUND).json({ message: 'Post não existe' });
  }
  return res.status(OK).json(post);
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await BlogPosts.findByPk(id);
  const { email } = decode(req.headers.authorization);

  const user = await Users.findOne({ where: { email } });
  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(UNAUTHORIZED).json({ message: 'Usuário não autorizado' });
  }
  await BlogPosts.update(
    { title, content },
    {
      where: { id },
    },
  );
  return res.status(OK).json({ title, content, userId: post.dataValues.userId });
};

const getByQuery = async (req, res) => {
  const { email } = decode(req.headers.authorization);
  const user = await Users.findOne({ where: { email } });
  const { id } = user.dataValues;
  const { q } = req.query;
  const targetedPosts = await BlogPosts.findAll({
    include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
    where: {
      userId: id,
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    } });
  if (q === '') {
    const allPosts = await BlogPosts.findAll({
      include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
      where: { userId: id },
    });
    return res.status(OK).json(allPosts);
  }
  return res.status(OK).json(targetedPosts);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  editPost,
  getByQuery,
};
