const { Users } = require('../models');

const findUsers = () => Users.findAll();

const findById = (id) => Users.findByPk(id);

const findEmail = (userEmail) => Users.findAll({
  where: { email: userEmail },
});

const findUserByEmailAndPassword = (userEmail, userPassword) => Users.findAll({
  where: {
    email: userEmail,
    password: userPassword,
  },
});

const deleteUser = (userId) => {
  Users.destroy({
    where: {
      id: userId,
    },
  });
};

const addUser = async (user) => Users.create(user);

module.exports = {
  findUsers,
  findById,
  findEmail,
  findUserByEmailAndPassword,
  addUser,
  deleteUser,
};
