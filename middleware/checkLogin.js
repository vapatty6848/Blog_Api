const { Users } = require('../models');

const checkLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { Authorization: token } = req.headers;
  req.payload = token;
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });

  const userEmail = await Users.findAll({
    where: {
      email,
    },
  });
  console.log(userEmail.length);
  if (userEmail.length < 1) return res.status(400).json({ message: 'Campos inválidos' });
  next();
};

module.exports = checkLogin;
