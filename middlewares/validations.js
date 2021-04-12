const { User } = require('../models');

const validatePasswordLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    // return res.status(400).json({ message: 'Campos inválidos' });
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
  res.locals.user = user.dataValues;
};

const validateEmailLogin = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    // return res.status(400).json({ message: 'Campos inválidos' });
    return (
      next({
        message: 'Campos inválidos',
        status: 400,
      })
    );
  }
};

const validateEmailRegister = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    // return res.status(409).json({ message: 'Usuário já existe' });
    return (
      next({
        message: 'Usuário já existe',
        status: 409,
      })
    );
  }
};

module.exports = {
  validatePasswordLogin, validateEmailLogin, validateEmailRegister,
};
