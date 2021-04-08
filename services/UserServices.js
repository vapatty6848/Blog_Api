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

module.exports = {
  findEmailExist,
  createNewUser,
};
