const { BlogPost } = require('../../database/models');
const { User } = require('../../database/models');

module.exports = {
  async execute({ id }) {
    const post = await BlogPost
      .findAll({
        where: { id },
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] } }],
        attributes: { exclude: ['userId'] },
      });

    if (post.length === 0) return false;

    return post;
  },
};
