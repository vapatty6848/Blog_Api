const { User } = require('../models');
const { generateToken, verifyToken } = require('../security');

const create = async (displayName, email, password, image) => {
  try {
    const { id } = await User.create({ displayName, email, password, image });
    const token = generateToken(id);
    return token;
  } catch (err) {
    console.error(err);
  }
};

const getAll = async () => {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (err) {
    console.error(err);
  }
};

const getById = async (id) => {
  try {
    const { dataValues: { displayName, email, image } } = await User.findOne({
      where: {
        id,
      },
    });

    return {
      id: parseInt(id, 10),
      displayName,
      email,
      image,
    };
  } catch (err) {
    console.error(err);
  }
};

const remove = async (token) => {
  try {
    const { sub } = verifyToken(token);
    await User.destroy({
      where: { id: sub },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
