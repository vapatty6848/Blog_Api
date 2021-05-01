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
    return usersList;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return res.status(status).json({ message: msg });
  }
};

const getOne = async ({ id }) => {
  try {
    const foundUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (foundUser === null) return { status: 404, message: 'Usuário não existe' };
    return foundUser;
  } catch (e) {
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

const deleteMe = async ({ id }) => {
  try {
    await User.destroy({ where: { id } });
    return true;
  } catch (e) {
    console.log(e);
    const { status, msg } = errorFormatter(e);
    return { status, message: msg };
  }
};

module.exports = {
  createUser,
  getAll,
  getOne,
  deleteMe,
};
