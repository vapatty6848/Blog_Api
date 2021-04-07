const rescue = require('express-rescue');
const { BlogPosts } = require('../models');
const Status = require('../dictionary/StatusCode');
// const createToken = require('../auth/createToken');

// const getAllUsers = rescue(async (_req, res) => {
//   const users = await Users.findAll();
//   res.status(Status.code200).json(users);
// });

// const getUserById = rescue(async (req, res) => {
//   const { id } = req.params;
//   const user = await Users.findOne({ where: { id } });
//   res.status(Status.code200).json(user);
// });

const createNewPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.decodedUser;
  await BlogPosts.create({ title, content, userId: id });
  return res.status(Status.code201).json({ title, content, userId: id });
});

// const destroyUser = rescue(async (req, res) => {
//   const { email } = req.decodedUser;
//   await Users.destroy({ where: { email } });
//   return res.status(Status.code204).send();
// });

module.exports = {
  createNewPost,
};
