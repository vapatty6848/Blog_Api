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

module.exports = {
  createPost,
  getAll,
  getOne,
};
