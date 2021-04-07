const { User } = require('../models');

const addUser = async (displayName, email, password, image) => {
  await User.create({ displayName, email, password, image });
  return { name: displayName, userEmail: email, userImage: image };
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

const loginWithEmailAndPass = async (userEmail, userPassword) => {
  try {
    const getUser =  await User.findAll({
      where: { 
        email: userEmail,
        password: userPassword,
      },
    });
    return getUser;

  } catch(_error) {
    return null;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  loginWithEmailAndPass,
};
