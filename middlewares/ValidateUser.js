const { Users } = require('../models');
const Status = require('./StatusCode');

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const ExistOrNot = async (req, _res, next) => {
  const { email } = req.body;

  const userExists = await Users.findOne({ where: { email } });

  if (userExists) {
    return next(errorMsg(Status.code409, 'Usuário já existe'));
  }

  next();
};

const FormatOfUserInfos = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const passRegex = /.{6,}/;

  if (!displayName && displayName.length <= 8) {
    return next(errorMsg(Status.code400, '"displayName" length must be at least 8 characters long'));
  }

  if (!email) {
    return next(errorMsg(Status.code400, '"email" is required'));
  } if (!emailRegex.test(email)) {
    return next(errorMsg(Status.code400, '"email" must be a valid email'));
  }

  if (!password) {
    return next(errorMsg(Status.code400, '"password" is required'));
  } if (!passRegex.test(password)) {
    return next(errorMsg(Status.code400, '"password" length must be 6 characters long'));
  }

  next();
};

module.exports = { ExistOrNot, FormatOfUserInfos };
