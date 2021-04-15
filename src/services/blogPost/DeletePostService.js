const { BlogPost } = require('../../database/models');

module.exports = {
  async execute({ id }) {
    const postById = await BlogPost.destroy({ where: { id } });

    if (postById === 1) return true;

    return false;
  },
};
