const { Users } = require('../models');

const checkUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const displayArray = displayName.split('');
  const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  const checkPassword = password.split('');
  const userEmail = await Users.findAll({
    where: {
      email,
    },
  });

  if (userEmail[0]) return res.status(404).json({ message: 'Usuário já existe' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (displayArray.length < 8) return res.status(400).json({ message: '"displayName" length must be at least 8 caracters long' });
  if (checkPassword.length < 6) return res.status(400).json({ message: '"password" length must be 6 caracters long' });
  if (checkEmail === false) return res.status(400).json({ message: '"email" must be a valid email' });

  next();
};

module.exports = checkUser;
