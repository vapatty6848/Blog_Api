const { User, BlogPost } = require('../models');

const emailExist = async (email) => {
  const emailRegistered = await User.findAll();
  const emails = emailRegistered.filter((user) => user.email === email);
  if (emails.length > 0) return false;
  return true;
};

const getAllPostsByUser = async (userId) => {
  const posts = await BlogPost.findAll({
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    where: { userId } });
  return posts;
};

module.exports = {
  emailExist,
  getAllPostsByUser,
};
