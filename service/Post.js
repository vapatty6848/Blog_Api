const { BlogPosts, User } = require('../models');
const errorFormatter = require('../middleware/errorFormatter');

const createPost = async ({ title, content, userId }) => {
  try {
    console.log(title);
    const posted = await BlogPosts.create({ title, content, userId });
    console.log('posted: ', posted);
    return { title, content, userId };
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

const getAll = async () => {
  try {
    const postsList = await BlogPosts.findAll({
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      }],
    });
    return postsList;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

const getOne = async ({ id }) => {
  try {
    const post = await BlogPosts.findByPk(
      id,
      {
        include: [{
          model: User, as: 'user', attributes: { exclude: ['password'] },
        }],
      },
    );
    if (post === null) return { status: 404, message: 'Post não existe' };
    return post;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

const editOne = async ({ id, title, content, userId }) => {
  try {
    const post = await BlogPosts.findByPk(id);
    if (!title) return { status: 400, message: '"title" is required' };
    if (!content) return { status: 400, message: '"content" is required' };
    if (post === null) return { status: 404, message: 'Post não existe' };
    if (post.userId !== userId) return { status: 401, message: 'Usuário não autorizado' };
    await BlogPosts.update(
      {
        title,
        content,
        updated: new Date(),
      },
      {
        where: { id },
      },
    );
    return { title, content, userId };
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

const deleteOne = async ({ id, userId }) => {
  try {
    const post = await BlogPosts.findByPk(id);
    if (post === null) return { status: 404, message: 'Post não existe' };
    if (post.userId !== userId) return { status: 401, message: 'Usuário não autorizado' };
    await BlogPosts.destroy({ where: { id } });
    return true;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

module.exports = {
  createPost,
  getAll,
  getOne,
  editOne,
  deleteOne,
};
