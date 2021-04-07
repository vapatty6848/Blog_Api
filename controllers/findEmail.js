const { User } = require('../models');

const findEmail = (email) => User
  .findOne({ where: { email } })
  .then(true)
  .catch((e) => console.error(e.message));

module.exports = findEmail;
