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

const getById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return post;
};

const remove = async (id) => {
  await BlogPosts.destroy({ where: { id } });

  return {};
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
