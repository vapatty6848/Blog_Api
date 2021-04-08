const { Users } = require('../models');
const { generateToken, getUsers } = require('../utils');

async function create(newUser) {
  const { displayName, email, password, image } = newUser;
  try {
    await Users.create({ displayName, email, password, image });
    return generateToken({ email });
  } catch (error) {
    console.error(error);
  }
}

async function findByEmail(email) {
  try {
    const [result] = await Users.findAll({
      where: {
        email,
      },
    });
    if (!result) return;

    const user = result.dataValues;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getAll() {
  const queryResult = await Users.findAll();
  const users = getUsers(queryResult);
  return users;
}

async function getById(id) {
  const queryResult = await Users.findByPk(id);
  if (!queryResult) return null;
  const { password, ...userInfo } = queryResult.dataValues;
  return userInfo;
}

module.exports = {
  create,
  findByEmail,
  getAll,
  getById,
};
