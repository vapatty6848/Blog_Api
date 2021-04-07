const { Users } = require('../models');
const { USER_ALREADY_EXIST, USER_NOT_FOUND, DYSPLAYNAME_SIZE, EMAIL_REQUIRED, EMAIL_BAD_FORMAT,
  PASSWORD_REQUIRED, PASSWORD_BAD_FORMAT } = require('../dictionary/errorDictionary');

const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const passRegex = /.{6,}/;

const ExistOrNot = async (req, _res, next) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return next(USER_ALREADY_EXIST);
  next();
};

const UserExistsByID = async (req, _res, next) => {
  const { id } = req.params;
  const userExists = await Users.findOne({ where: { id } });
  if (!userExists) return next(USER_NOT_FOUND);
  next();
};

const FormatOfUserInfos = async (req, _res, next) => {
  const { displayName, email, password } = req.body;
  if (!displayName || displayName.length < 8) return next(DYSPLAYNAME_SIZE);
  if (!email || email === '') return next(EMAIL_REQUIRED);
  if (!emailRegex.test(email)) return next(EMAIL_BAD_FORMAT);
  if (!password || password === '') return next(PASSWORD_REQUIRED);
  if (!passRegex.test(password)) return next(PASSWORD_BAD_FORMAT);
  next();
};

module.exports = { ExistOrNot, FormatOfUserInfos, UserExistsByID };
