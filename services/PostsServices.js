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

// const getPostByQuery = rescue(async (req, res) => {
//   const email = req.user.data;
//   const user = await Users.findOne({ where: { email } });
//   const { id } = user.dataValues;
//   const { q } = req.query;
//   const targetedPosts = await BlogPosts.findAll({
//     include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
//     where: {
//       userId: id,
//       [Op.or]: [
//         { title: { [Op.like]: `%${q}%` } },
//         { content: { [Op.like]: `%${q}%` } },
//       ],
//     } });
//   if (q === '') {
//     const allPosts = await BlogPosts.findAll({
//       include: { model: Users, as: 'user', attributes: { exclude: 'password' } },
//       where: { userId: id },
//     });
//     return res.status(STATUS_OK).json(allPosts);
//   }
//   return res.status(STATUS_OK).json(targetedPosts);
// });

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
  // getPostByQuery,
  destroyPost,
};
