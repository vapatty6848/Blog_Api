const { Users } = require('../models');
const { generateToken } = require('../utils');

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

module.exports = {
  create,
  findByEmail,
};
