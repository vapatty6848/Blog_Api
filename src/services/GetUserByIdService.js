const { User } = require('../database/models');

module.exports = {
  async execute({ id }) {
    const userById = await User.findByPk(id);

    if (userById) return userById;

    return false;
  },
};
