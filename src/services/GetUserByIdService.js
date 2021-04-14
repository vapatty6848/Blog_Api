const { User } = require('../database/models');

module.exports = {
  async execute({ id }) {
    const userById = await User.findOne({ where: { id } });

    if (userById) return userById;

    return false;
  },
};
