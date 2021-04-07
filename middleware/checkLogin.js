const { Users } = require('../models');

const checkLogin = async (req, res, next) => {
  const dataUser = req.body;
  console.log(dataUser);
  if (dataUser.password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (dataUser.email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!dataUser.email) return res.status(400).json({ message: '"email" is required' });
  if (!dataUser.password) return res.status(400).json({ message: '"password" is required' });

  const userEmail = await Users.findAll({
    where: {
      email: dataUser.email,
    },
  });

  if (userEmail.length < 1) return res.status(400).json({ message: 'Campos inválidos' });
  if (userEmail[0].password !== dataUser.password) return res.status(401).json({ message: 'login invalido' });

  const { displayName, email, password, image } = userEmail[0];
  req.payload = { displayName, email, password, image };
  next();
};

module.exports = checkLogin;
