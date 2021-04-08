const createToken = require('../authentication/createToken');
const { User, sequelize } = require('../models');

const { messages, status } = require('../utils');

const registerUser = async (info) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newUser = await User.create({ ...info }, { transaction: t });

      const {
        id, password, ...userWithoutPassword
      } = newUser;

      const token = createToken(userWithoutPassword);

      return { status: status.CREATED, token };
    });
    return result;
  } catch (err) {
    const validatorError = err.errors[0].validatorKey;
    if (validatorError === 'not_unique') return { status: status.CONFLICT, message: messages.USER_EXISTS };
    return { status: status.INTERNAL_ERROR, message: messages.SMT_WRONG };
  }
};

module.exports = {
  registerUser,
};
