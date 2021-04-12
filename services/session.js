const { User } = require('../models');
const { generateToken } = require('../security');

const login = async (email) => {
  try {
    const { id } = await User.findOne({
      where: {
        email,
      },
    });

    const token = generateToken(id);
    return token;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  login,
};
