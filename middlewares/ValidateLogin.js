const { Users } = require('../models');
const Status = require('./StatusCode');

const errorMsg = (status, mess) => ({ statusCode: status, message: { message: mess } });

const InputsFormatAndUserExists = async (req, _res, next) => {
  const { email, password } = req.body;

  if (email === '') return next(errorMsg(Status.code400, '"email" is not allowed to be empty'));
  if (!email) return next(errorMsg(Status.code400, '"email" is required'));
  console.log(password);
  if (password === '') return next(errorMsg(Status.code400, '"password" is not allowed to be empty'));
  if (!password) return next(errorMsg(Status.code400, '"password" is required'));

  const userExists = await Users.findOne({ where: { email } });
  if (!userExists) return next(errorMsg(Status.code400, 'Campos inválidos'));

  next();
};

module.exports = { InputsFormatAndUserExists };
