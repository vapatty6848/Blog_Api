const { Users } = require('../models');

const CONFLICT = 409;

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const emailExists = await Users.findOne({ where: { email } });
  if (emailExists) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }
  next();
};

module.exports = validateEmail;
