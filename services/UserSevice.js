const { User } = require('../models');

const addUser = async (displayName, email, password, image) => {
  await User.create({ displayName, email, password, image });
  return { name: displayName, userEmail: email, userImage: image };
};

const deleteUser = async (userId) => {
  await User.destroy({
    where: {
      id: userId,
    },
  });
};

const getUserByEmail = async (userEmail) => {
  const [found] = await User.findAll({
    where: {
      email: userEmail,
    },
  });
  if (!found) return false;
  return true;
};

const getUserById = async (userId) => {
  try {
    const { id, displayName, email, image } = await User.findByPk(userId);
    return { id, displayName, email, image };
  } catch (_err) {
    return null;
  }
};

const loginWithEmailAndPass = async (userEmail, userPassword) => {
  try {
    const getUser = await User.findAll({
      where: {
        email: userEmail,
        password: userPassword,
      },
    });
    return getUser;
  } catch (_error) {
    return null;
  }
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

module.exports = {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  loginWithEmailAndPass,
};
