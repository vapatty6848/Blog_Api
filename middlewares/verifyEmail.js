const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const verify = async (req, res, next) => {
  const { email } = req.body;
  const verifyemail = await User.findOne({ where: { email } });
  if (verifyemail) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Usuário já existe' });
  }
  next();
};

const verifyLogin = async (req, res, next) => {
  const { email } = req.body;
  const verifyemail = await User.findOne({ where: { email } });
  if (!verifyemail) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Campos inválidos' });
  }
  next();
};

module.exports = {
  verify,
  verifyLogin,
};
