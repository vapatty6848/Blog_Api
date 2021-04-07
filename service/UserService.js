const { Users } = require('../models');

const findUsers = () => Users.findAll();

const findEmail = (userEmail) => Users.findAll({
  where: { email: userEmail },
});

const findUserByEmailAndPassword = (userEmail, userPassword) => {
  Users.findAll({
    where: {
      email: userEmail,
      password: userPassword,
    },
  });
};

const addUser = async (user) => Users.create(user);

module.exports = {
  findUsers,
  findEmail,
  findUserByEmailAndPassword,
  addUser,
};
