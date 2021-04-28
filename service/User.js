const { User } = require('../models');
const errorFormatter = require('../middleware/errorFormatter');
const tokenCreator = require('../middleware/tokenCreator');

const createUser = async (newUser, res) => {
  try {
    const createdUser = await User.create(newUser);
    return tokenCreator(createdUser);
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return res.status(status).json({ message: msg });
  }
};

const getAll = async (res) => {
  try {
    const usersList = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    console.log('usersList from getAll: ', usersList);
    return usersList;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return res.status(status).json({ message: msg });
  }
};

module.exports = {
  createUser,
  getAll,
};
