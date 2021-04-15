const { BlogPost } = require('../../database/models');
const { User } = require('../../database/models');

module.exports = {
  async execute() {
    const posts = await BlogPost
      .findAll({
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] } }],
        attributes: { exclude: ['userId'] },
      });

    return posts;
  },
};
