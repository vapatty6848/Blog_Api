const { User } = require('../models');

const searchEmail = async (email) => {
  const [emailLocated] = await User.findAll({
    where: { email },
  });
  return emailLocated;
};

const createNewUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const listAllUsers = async () => {
  const listOfUsers = await User.findAll();
  console.log('listOfUsers', listOfUsers);
  return listOfUsers;
};

const IdUsers = async (id) => {
  const listOfUsersId = await User.findAll({
    where: { id },
  });
  return listOfUsersId;
};

const deleteUser = async (email) => {
  const userDeleted = await User.destroy({ where: { email },
  });
  return userDeleted;
};

module.exports = {
  deleteUser,
  IdUsers,
  listAllUsers,
  createNewUser,
  searchEmail,
};
