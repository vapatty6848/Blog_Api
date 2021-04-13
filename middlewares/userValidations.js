const { statusCode, statusMsg } = require('../utils/dictionary');
const { User } = require('../models');

const isAName = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.NAME_LENGTH });
  }
  next();
};

const isAnEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.EMAIL_REQUIRED });
  }

  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexEmail.test(email)) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.EMAIL_VALID });
  }

  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists !== null) {
    return res.status(statusCode.CONFLICT)
      .send({ message: statusMsg.USER_EXISTS });
  }
  next();
};

const isAPassword = async (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password === null) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.PASSWORD_REQUIRED });
  }
  if (password.length < 6) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.PASSWORD_LENGTH });
  }
  next();
};

module.exports = { isAName, isAnEmail, isAPassword };
