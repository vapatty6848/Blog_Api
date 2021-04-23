const { User } = require('../models');

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

/** Verifica de o nome do Usuário e menor que 8 */
const smallerToEight = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

/** valida os campos de email */
const validingEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: '"email" is required' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

/** valida a senha */
const validingPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

/** verificando se email já existe */
const searchEmail = async (req, res, next) => {
  const { email } = req.body;
  const result = await User.findOne({
    where: { email },
  });
  if (result) return res.status(409).json({ message: 'Usuário já existe' });
  next();
};

module.exports = {
  smallerToEight,
  validingEmail,
  validingPassword,
  searchEmail,
};
