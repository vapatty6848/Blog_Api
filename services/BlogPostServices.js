const { BlogPost, sequelize } = require('../models');
const { messages, status } = require('../utils');

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

module.exports = {
  newPost,
};
