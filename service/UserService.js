const { Users } = require('../models');

const findUsers = () => Users.findAll();

const findEmail = (userEmail) => Users.findAll({
  where: { email: userEmail },
});

const addUser = async (user) => Users.create(user);

module.exports = {
  findUsers,
  findEmail,
  addUser,
};
