const { BlogPosts, Users } = require('../models');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
// const STATUS_NO_CONTENT = 204;
// const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const email = req.user.data;
  const correspondentUser = await Users.findOne({ where: { email } });
  const userId = correspondentUser.dataValues.id;
  try {
    const post = await BlogPosts.create({ userId, title, content });
    return res.status(STATUS_CREATED).send(post);
  } catch (error) {
    return res.status(INTERNAL_ERROR).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  const email = req.user.data;
  const user = await Users.findOne({ where: { email } });
  const { id } = user.dataValues;
  const posts = await BlogPosts.findAll({ include: { model: Users, as: 'user', attributes: { exclude: 'password' } }, where: { userId: id } });
  res.status(STATUS_OK).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};
