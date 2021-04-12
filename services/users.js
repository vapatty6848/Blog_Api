const { User } = require('../models');

const findByEmail = async (email) => User.findOne({ where: { email } });

const loginUser = async (email, password) => User.findOne({ where: { email, password } });

const createUser = async (displayName, email, password, image) => (
  User.create({ displayName, email, password, image })
);

const findAllUsers = async () => User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

// const findUserById = async (id) => {
//   const user = await User.findAll({
//     where: { id },
//     attributes: ['id', 'displayName', 'email', 'image'],
//   });

//   if (user.length === 0) return null;

//   return user[0];
// };

const findUserById = async (id) => User.findOne({
  where: { id },
  attributes: ['id', 'displayName', 'email', 'image'],
});

const deleteUser = async (id, email) => User.destroy({ where: { id, email } });

module.exports = {
  findByEmail,
  loginUser,
  createUser,
  findAllUsers,
  findUserById,
  deleteUser,
};
