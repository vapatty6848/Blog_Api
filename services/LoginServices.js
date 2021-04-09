const createToken = require('../authentication/createToken');
const { User } = require('../models');
const { messages, status } = require('../utils');

const loginUser = async (info) => {
  try {
    const result = await User.findOne({ where: { email: info.email, password: info.password } });

    if (!result) return { status: status.BAD_REQUEST, message: messages.INVALID_FIELD_DATA };

    const {
      password, ...userInfo
    } = result.dataValues;

    const token = createToken(userInfo);

    return { status: status.OK, token };
  } catch (err) {
    return { status: status.INTERNAL_ERROR, message: messages.SMT_WRONG };
  }
};

module.exports = {
  loginUser,
};
