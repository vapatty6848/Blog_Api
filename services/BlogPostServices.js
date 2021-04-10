const { BlogPost, User, sequelize } = require('../models');
const { messages, status } = require('../utils');

const findAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return { status: status.OK, message: allPosts };
};

const findPost = async (id) => {
  const post = await BlogPost.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (post === null) return { status: status.NOT_FOUND, message: messages.NOT_FOUND_POST };

  return { status: status.OK, post };
};

const newPost = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create({ ...data }, { transaction: t });

      const {
        id, ...newPostData
      } = post.dataValues;

      return { status: status.CREATED, message: newPostData };
    });
    return result;
  } catch (err) {
    return { status: status.INTERNAL_ERROR, message: messages.SMT_WRONG };
  }
};

const updatePost = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { title, content, id, userId } = data;

      const success = await BlogPost.update(
        { title, content },
        { where: { id, userId } },
        { transaction: t },
      );

      if (success[0] === 0) return { status: status.UNAUTHORIZED, message: messages.UNAUTHORIZED };

      const post = await BlogPost.findByPk(id, {
        attributes: ['title', 'content', 'userId'],
      });

      return { status: status.OK, post };
    });
    return result;
  } catch (err) {
    return { status: status.INTERNAL_ERROR, message: messages.SMT_WRONG };
  }
};

const deletePost = async (data) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { id, userId } = data;
      const post = await BlogPost.findByPk(id);

      if (!post) return { status: status.NOT_FOUND, message: messages.NOT_FOUND_POST };

      if (post.id === Number(id) && post.userId !== userId) {
        return { status: status.UNAUTHORIZED, message: messages.UNAUTHORIZED };
      }

      if (post.id === Number(id) && post.userId === userId) {
        await BlogPost.destroy({ where: { id, userId } }, { transaction: t });
      }
      return { status: status.NO_CONTENT, post };
    });
    return result;
  } catch (err) {
    return { status: status.INTERNAL_ERROR, message: messages.SMT_WRONG };
  }
};

module.exports = {
  findAllPosts,
  findPost,
  newPost,
  updatePost,
  deletePost,
};
