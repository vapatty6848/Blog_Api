const { User } = require('../models');

const validationUser = async (req, res, next) => {

  const { displayName, email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);

  if (displayName.length < 8) return res.status(400).json({
    message: '"displayName" length must be at least 8 characters long'
  });
  if (!email) return res.status(400).json({
    message: '"email" is required'
  });
  if (!password) return res.status(400).json({
    message: '"password" is required'
  });
  if (!regex) return res.status(400).json({
    message: '"email" must be a valid email'
  });
  if (password.length < 6) return res.status(400).json({
    message: '"password" length must be 6 characters long'
  });

  const findUser = await User.findAll({ where: { email } });
  if (findUser.length > 0) return res.status(409).json({
    message: 'Usuário já existe'
  });

  next();

};

module.exports = validationUser;
