const { statusCode, statusMsg } = require('../utils/dictionary');
const { User } = require('../models');

const isAName = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.NAME_LENGTH });
  }
  next();
};

const isAnEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.EMAIL_EMPTY });
  }

  if (!email) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.EMAIL_REQUIRED });
  }

  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!regexEmail.test(email)) {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.EMAIL_VALID });
  }
  next();
};

const emailAlreadyExists = async (email) => User.findOne({ where: { email } });

const isAPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(statusCode.BAD_REQUEST)
      .send({ message: statusMsg.PASSWORD_EMPTY });
  }

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

module.exports = { isAName, isAnEmail, emailAlreadyExists, isAPassword };
