const { User } = require('../../database/models');

module.exports = {
  async execute(id) {
    const userById = await User.destroy({ where: { id } });

    if (userById) return userById;

    return false;
  },
};
