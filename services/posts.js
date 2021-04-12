const { BlogPost, User } = require('../models');
const { verifyToken } = require('../security');

const create = async (title, content, token) => {
  try {
    const { sub } = verifyToken(token);
    const post = await BlogPost.create({
      title,
      content,
      userId: sub,
      published: Date.now(),
      updated: Date.now(),
    });

    return post;
  } catch (err) {
    console.error(err);
  }
};

const getAll = async () => {
  try {
    const allPosts = await BlogPost.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });

    return allPosts;
  } catch (err) {
    console.error(err);
  }
};

const getById = async (id) => {
  try {
    const post = await BlogPost.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });

    return post;
  } catch (err) {
    console.error(err);
  }
};

const update = async (id, title, content) => {
  try {
    await BlogPost.update(
      {
        title,
        content,
        updated: Date.now(),
      },
      { where: { id } },
    );
    const post = await BlogPost.findOne({ id });
    return post;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
