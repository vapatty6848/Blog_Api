const { User, BlogPost } = require('../models');

const emailExist = async (email) => {
  const emailRegistered = await User.findAll();
  const emails = emailRegistered.filter((user) => user.email === email);
  if (emails.length > 0) return false;
  return true;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getUserPostById = async (id) => {
  const post = await BlogPost.findOne({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { id } });
  return post;
};

module.exports = {
  emailExist,
  getUserByEmail,
  getUserPostById,
};
