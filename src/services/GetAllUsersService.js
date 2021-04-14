const { User } = require('../database/models');

module.exports = {
  async execute() {
    const userByEmail = await User.findAll();

    if (userByEmail) return userByEmail;

    return false;
  },
};
