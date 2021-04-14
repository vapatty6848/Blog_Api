const { User } = require('../../models');

const validateRegister = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    if (displayName.length < 8) throw new Error('"displayName" length must be at least 8 characters long');
    if (!email) throw new Error('"email" is required');
    if (emailRegex.test(email) === false) throw new Error('"email" must be a valid email');
    if (!password) throw new Error('"password" is required');
    if (password.length < 6) throw new Error('"password" length must be 6 characters long');
    const emailsDatabase = await User.findAll({ attributes: ['email'] });
    const emailExists = emailsDatabase.some((el) => el.email === email);
    if (emailExists === true) throw new Error('Usuário já existe');
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { validateRegister };
