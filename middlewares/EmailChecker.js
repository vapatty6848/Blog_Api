const { User } = require('../models');

const EmailChecker = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findAll({
    where: { email },
  });
  if (user) return res.status(409).json({ message: 'Usuário já existe' });
  next();
};

module.exports = EmailChecker;
