const { User } = require('../models');

const findByEmail = async (userEmail) => User
  .findAll({ where: { email: userEmail } });

module.exports = findByEmail;
