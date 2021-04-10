// const { Op } = require('sequelize');
const { Users } = require('../models');

const findEmailExist = async (email) => {
  const [emailExist] = await Users.findAll({
    where: {
      email,
    },
  });
  return emailExist;
};

// const findExistUser = async (email, password) => {
//   const userExist = await Users.findOne({
//     where: {
//       [Op.and]:
//       [
//         email,
//         password,
//       ],
//     },
//   });
//   return userExist;
// };

const createNewUser = async (displayName, email, password, image) => {
  const user = await Users.create({ displayName, email, password, image });
  return user;
};

const usersAll = async () => {
  const listOfUsers = await Users.findAll();
  return listOfUsers;
};

const userId = async (id) => {
  const listOfUser = await Users.findAll({
    where: {
      id,
    },
  });
  return listOfUser;
};

const userDelete = async (email) => {
  console.log(email);
  const userDeleted = await Users.destroy({
    where: {
      email,
    },
  });
  return userDeleted;
};

module.exports = {
  findEmailExist,
  createNewUser,
  usersAll,
  userId,
  userDelete,
};
