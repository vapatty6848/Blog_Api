const { Users } = require('../models');

const emailValidate = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

const validateCreateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  
  if (displayName.length < 8) {
    res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  };

  if (!email) {
    res.status(400).json({ message: '"email" is required' });
  };

  if (!emailValidate(email)) {
    res.status(400).json({ message: '"email" must be a valid email' });
  };

  const emailExist = await Users.findOne({ where: { email } });
  
  if (emailExist) {
    res.status(409).json({ message: 'Usuário já existe' })
  };

  if (!password) {
    res.status(400).json({ message: '"password" is required' });
  };

  if (password.length < 6) {
    res.status(400).json({ message: '"password" length must be 6 characters long' });
  };

  next();
};

module.exports = {
  validateCreateUser,
};