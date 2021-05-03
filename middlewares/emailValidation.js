const { Users } = require('../models');

const CONFLICT = 409;

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailExists = await Users.findOne({ where: { email } });
    if (emailExists) {
      res.status(CONFLICT).json({ message: 'Usuário já existe' });
    }
  } catch (error) {
    res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }
  next();
};

module.exports = validateEmail;
