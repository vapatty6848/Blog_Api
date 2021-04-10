const { BlogPosts, Users } = require('../models');

const create = async (post) => {
  console.log('post service', post);
  const postCreated = await BlogPosts.create(post);
  return postCreated;
};

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  });
  return posts;
};

// const getById = async (id) => {
//   const user = await BlogPosts.findByPk(id);
//   return user;
// };

// const getByEmail = async (email) => {
//   const user = await BlogPosts.findOne({ where: { email } });
//   return user;
// };

// const remove = async (id) => {
//   const removeUser = await BlogPosts.destroy({ where: { id } });
//   if (!removeUser) return { message: 'Usuário não existe' };

//   return {};
// };

module.exports = {
  create,
  getAll,
  // getById,
  // getByEmail,
  // remove,
};
